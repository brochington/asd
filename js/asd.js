(function (window, asd, undefined){
    var asd = {},
        internalMainObj = {},
        classes = window.asdClasses,
        asdp = window.asdPubSub;
        asdf = window.asdFunctions;

    var bodyDOMObject = new classes.bodyDOMObject();


    asd.init = function(){
        var mainObj = new classes.mainObj();
        var bodyDOM = asd.getBodyDOM();
        mainObj = asd.createElementObjects(mainObj, bodyDOM);
        internalMainObj = mainObj;
        return mainObj;
    };
    // gets DOM and CSS of each Node.
    asd.getBodyDOM = function(mainObj){
        var bodyDOM = document.getElementsByTagName('body')[0].children;
        return bodyDOM;
    };

    asd.createElementObjects = function(mainObj, bodyDOM){
        console.log("createElementObjects");
        var bodyDOMLength = bodyDOM.length;
        for(var i = 0; i < bodyDOMLength; i++){
            if(bodyDOM[i].nodeName !== "SCRIPT"){
                bodyDOMObject.bodyDOMArray.push(bodyDOM[i]);
                var stdElement = new classes.stdElement(bodyDOM[i]);
                if(stdElement !== undefined){
                    Object.defineProperty(mainObj, stdElement.id, {value: stdElement});    
                    asd.setupCSS(stdElement, mainObj);
                    asd.setupMutationObserver(stdElement);
                    if(bodyDOM[i].nodeName === "INPUT"){
                        asd.setupInputLister(mainObj, stdElement);
                    }
                }  
            }
        };
        return mainObj; 
    };


    /*****************Setup Functions*********************/

    asd.setupCSS = function(obj, mainObj){
        if(obj.id){
            var el = document.getElementById(obj.origin.id);
            var st = window.getComputedStyle(el, null);
            for (var key in st){
                var num = parseInt(key).toString();
                if(num === 'NaN'){
                    var localObj = {};
                    obj[key] = {
                        _val : st[key],
                        name : key,
                        id : obj.origin.id
                    };
                    localObj = obj[key];
                    // TODO: find out a way to not have the val method.
                    Object.defineProperty(obj[key], 'val', {
                        get: function(){
                            // console.log("getter of css");
                            return this._val;},
                        set: function(value){
                            console.log("css set");
                            console.log(value);

                            if(value.asdVarBindObj){
                                console.log("has asdVarBindObj.");
                                console.log(obj);
                                console.log(value.propName);
                                console.log(this);
                                asdp.subscribeCSS(value, obj, this, asdp.updateCSSSubscriber );
                            }
                            if(typeof value == "string"){
                                // console.log("string");
                                document.getElementById(this.id).style[this.name] = value;
                                this._val = value;
                            } 
                        }
                    });

                    Object.observe(localObj, asdf.observeStdElementObj);
                };
            };
        };
    };

    asd.setupMutationObserver = function(obj) {
        var target = document.getElementById(obj.origin.id);
        if(obj.origin.id){
            var observer = new MutationObserver(function(mutations){
                // add what the mutation updates here
                // console.log(mutations);
                mutations.forEach(function(mutation){
                    // and maybe here too..
                    // console.log(mutation.type);
                });
            });
            observer.observe(target, { attributes: true, childList: true, characterData: true });
        };
    };

    asd.setupInputLister = function(mainObj, obj){
        var target = document.getElementById(obj.origin.id);

        // asd.addListener(target, 'keydown', asd.keyupListener1, mainObj);
        asd.addListener(target, 'keydown', asd.stdListener1, mainObj);
    };

    asd.addListener = function(target, eventType, callback){
        // add switch case here for different types of events.
        switch(eventType){
            case 'keyup':

        }
        target.addEventListener(eventType, callback, false);
    }


    /*****************Listener Functions*********************/

    asd.stdListener1 = function(event){

        switch(event.type){
            case 'keydown':
            console.log("keydown");
            console.log(event.target);
        }
    };

    asd.keyupListener1 = function(e){
        window.setTimeout(function(){
            var temp = document.getElementById(e.target.id).value;    
            internalMainObj[e.target.id].innerText = temp;
            // console.log(temp);
            app.output_1.innerHTML = app.input_1.innerText;
        }, 2)
        
        // console.log(e.target.id);
        
        // internalMainObj[e.target.id].innerText = e.target.value;
        // console.log(internalMainObj[e.target.id].innerText);
    };

    



    window.asd = asd;
})(window);