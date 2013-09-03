(function (window, asdClasses, undefined, ns){
	"use strict"
	var ns = {},
		asd = window.asd,
		asdf = window.asdFunctions,
		asdp = window.asdPubSub;

	ns.mainObj = function(settings){
		var self = this;
		var obj = {};

		return obj;
	};

	ns.bodyDOMObject = function(){
		var self = this;
		var obj = {
			bodyDOMArray : []
		}
		return obj;
	}

	ns.stdElement = function(data){
		var self = this;
		var obj = {
			id : data.id,
			origin : data,
			style : {},
			localVals : {
				_innerHTML : data.innerHTML
				},
			};
		for (var key in obj.origin){
			if(key !== 'style'){
				obj[key] = obj.origin[key];
			};
		};
		Object.defineProperty(obj, "innerHTML", {
		 	get: function(){ return this.localVals._innerHTML;},
			set: function(value){
				document.getElementById(data.id).innerHTML = value;
				this.localVals._innerHTML = value;
			}
		});
		Object.defineProperty(obj, "css", {
			get: function(){ 
				var obj = asdf.getCSSAsObject(this);
				return obj; 
			},
			set: function(value){
				asdf.setCSSFromObject(this, value);
			}
		});



		return obj;
	};

	ns.inputElement = function(data){
		var self = this;
		var obj = {

		}
		return obj;
	};

	ns.varBindObj = function(data){

		var self = this,
			obj = { _val : {} };

		Object.observe(obj, asdf.observeVarBindObj);

		return obj;
	}

	window.asdClasses = ns;
})(window);