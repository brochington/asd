(function (window, asdFunctions, undefined, ns){
	var ns = {},
		asd = window.asd,
		classes = window.asdClasses,
		asdp = window.asdPubSub;

	ns.setCSSFromObject = function(el, CSSObj){
		for(var prop in CSSObj){
			el[prop].val = CSSObj[prop];
		}
	}

	ns.getCSSAsObject = function(el){
		 var obj = {};
		 for(var prop in el){
		 	if(el[prop]){
		 		var localProp = el[prop];
		 		if(typeof localProp == 'object'){
		 			if(localProp.hasOwnProperty('_val')){
		 				obj[prop] = localProp.val;
		 			}
		 		}
		 	}
		 }
		return obj;
	}

	ns.observeStdElementObj = function(changeObj){
		// console.log("observeStdElementObj");
		changeObj.forEach(function(val, i){
			var keyArr = Object.keys(val);
			switch (val.type){
				case 'new':
					// console.log("new");
					// console.log(changeObj);
					
					break;
				case 'updated':
					// console.log('updated');
					// console.log(changeObj);
					break;
			}
		});
	}

	ns.observeVarBindObj = function(changeObj){
		console.log("observeVarBindObj");
		changeObj.forEach(function(val, i){
			var keyArr = Object.keys(val);
			switch (val.type){
				case 'new':
					console.log("new varBindObj here.");
					var tempFunc = new Function();
					tempFunc = function(){return this._val[val.name].asdMetaVal};
					// tempFunc.asdMetaID = Math.floor((Math.random()*1000000)+1);
					tempFunc.asdMetaID = val.name;
					tempFunc.asdMetaVal = val.object[val.name];
					tempFunc.asdVarBindObj = true;
					tempFunc.propName = val.name;

					asdp.addToTopics(tempFunc, function(){
						// console.log("addToTopics callback");
					})

					// set the init value on the _val object.
					changeObj[i].object._val[val.name] = tempFunc;

					// add getter/setter for function property.
					Object.defineProperty(changeObj[i].object, val.name, {
						get: function(){
							console.log("get");
							return this._val[val.name];
						},
						set: function(value){
							console.log("set");
							if(ns.hasMetaID(value)){
								// console.log(this);
								// console.log(val.name);
								var metaID = value.asdMetaID;
								var metaVal = value.asdMetaVal;
								this._val[val.name].asdMetaVal = metaVal;
								asdp.subscribe(value, val, asdp.updateSubscribersByMetaID);
							} else {
								console.log("set, only string");
								// console.log(value);
								// console.log(this._val[val.name]);
								var tempVal = value;
								this._val[val.name].asdMetaVal = value;
								asdp.publish(this._val[val.name].asdMetaID, this._val[val.name].asdMetaVal , this, tempVal);
							}
						}
					});

					break;
				case 'updated':
					console.log('updated var');
					console.log(changeObj[i]);
					break;
			}
		});
	}

	ns.addVartoVarBindObj = function(varObj, varName, varInitValue){
		console.log("addVartoVarBindObj");
		Object.defineProperty(varObj, varName, {
			get: function(){ return varObj[varName].val},
			set: function(){
				varObj[varName].val = value;
			}
		});
		if(varInitValue){
			varObj[varName].val = varInitValue;	
		};
	}

	ns.hasMetaID = function(data, callback){
		if(data.hasOwnProperty('asdMetaID')){
			return true;
		} else {
			return false;
		}
	}

	window.asdFunctions = ns;
})(window);