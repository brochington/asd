(function (window, asdPubSub, undefined, ns){
	var ns = {},
		asd = window.asd,
		asdf = window.asdFunctions, 
		topics = {},
		uid = 0;

	ns.topics = function(){
		return topics;
	}

	ns.addToTopics = function(pubObject, callback){
		// console.log("addToTopics");
		var metaID = pubObject.asdMetaID.toString();
		topics[metaID] = [];

		if(callback) { callback() };

	}

	ns.publish = function(asdMetaID, asdMetaVal, destObj, newValue){
		console.log("at publish");

		// console.log(asdMetaID);
		// console.log(asdMetaVal);
		// console.log(destObj);
		// console.log(newValue);

		var metaID = asdMetaID,
			subscribers = topics[metaID],
			subscribersLength = subscribers.length;


		if(!topics.hasOwnProperty(metaID)){
			console.log("doesn't have metaID");
			return false;
		}

		for(var i = 0; i < subscribersLength; i++){
			var val = subscribers[i];
			// console.log(subscribers[i]);
			subscribers[i].func(destObj, val, newValue);	
			// console.log("through");
		}
	}

	ns.subscribe = function(pubObject, val, func){
		console.log("subscribe");
		// console.log(func);
		// console.log(val);
		var metaID = pubObject.asdMetaID;

		if(!topics.hasOwnProperty(metaID)){
			topics[metaID] = [];
		}
		var token = (++uid).toString();
		topics[metaID].push({ token : token, val : val, func : func, obj : pubObject });

		return token;
	}

	ns.subscribeCSS = function(pubObject, elementObj, val, func){
			console.log("subscribeCSS");

		var metaID = pubObject.asdMetaID;

		if(!topics.hasOwnProperty(metaID)){
			topics[metaID] = [];
		}
		var token = (++uid).toString();
		topics[metaID].push({ token : token, val : val, func : func, obj : pubObject, elementObj : elementObj });

		return token;
	}

	ns.unsubscribe = function(){
		console.log("unsubscribe");
	}
	ns.updateSubscribersByMetaID = function(destObj, val, newValue){

		destObj[val.val.name] = newValue;
	}

	ns.updateCSSSubscriber = function(destObj, val, newValue){
		console.log("updateCSSSubscriber");

		console.log(destObj);
		console.log(val);
		console.log(newValue);

		val.elementObj[val.val.name].val = newValue;

	}

	window.asdPubSub = ns;
})(window);






 
// (function(p){
 
//     "use strict";
 
    
 
//     var topics = {},
//         lastUid = -1;
 
    
 
//     var publish = function( topic , data){
//         if ( !topics.hasOwnProperty( topic ) ){
//             return false;
//         }

//         var notify = function(){
//             var subscribers = topics[topic],
//                 throwException = function(e){
//                 	return function(){
//                   	  throw e;
//                 	};
//             	}; 
//             for ( var i = 0, j = subscribers.length; i < j; i++ ){
//                 try {
//                     subscribers[i].func( topic, data );
//                 } catch( e ){
//                     setTimeout( throwException(e), 0);
//                 }
//             }
//         };
//         setTimeout( notify , 0 );
//         return true;
//     };
 
    
 
//     /**
//      *  Publishes the topic, passing the data to it's subscribers
//      *  @topic (String): The topic to publish
//      *  @data: The data to pass to subscribers
//     **/
 
//     p.publish = function( topic, data ){
//         return publish( topic, data, false );
//     };
 
    
 
//     *
//      *  Subscribes the passed function to the passed topic. 
//      *  Every returned token is unique and should be stored if you need to unsubscribe
//      *  @topic (String): The topic to subscribe to
//      *  @func (Function): The function to call when a new topic is published
//     *
 
//     p.subscribe = function( topic, func ){
//         // topic is not registered yet
//         if ( !topics.hasOwnProperty( topic ) ){
//             topics[topic] = [];
//         }
//         var token = (++lastUid).toString();
//         topics[topic].push( { token : token, func : func } );
 
//         // return token for unsubscribing
 
//         return token;
//     };
 
//     /**
//      *  Unsubscribes a specific subscriber from a specific topic using the unique token
//      *  @token (String): The token of the function to unsubscribe
//     **/
 
//     p.unsubscribe = function( token ){
//         for ( var m in topics ){
//             if ( topics.hasOwnProperty( m ) ){
//                 for ( var i = 0, j = topics[m].length; i < j; i++ ){
//                     if ( topics[m][i].token === token ){
//                         topics[m].splice( i, 1 );
//                         return token;
//                     }
//                 }
//             }
//         }
//         return false;
//     };