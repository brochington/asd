

window.onload = function(){
var asd = window.asd;
var asd_class = window.asdClasses;
window.app = asd.init();
window.a = new asd_class.varBindObj;
// what does asdf stand for again?



//going for:
a.var = "hello";
// This will create a property on the a, that can be listened to.

a.testColor = "green";
a.b = "c";
a.x = "y";


app.test_div_1.css = {
	height: "140px",
	width: "140px"
}

app.test_div_1.backgroundColor.val = a.testColor;

a.testColor = "orange";

// console.log(app);
// var counter = 0;
// 	window.setInterval(function(){
// 		counter++;
// 		app.myDiv.width.val = counter + "px";
// 		if(counter >= 300){
// 			app.myDiv.backgroundColor.val = '#'+Math.floor(Math.random()*16777215).toString(16);
// 			counter = 0;
// 		}
// 	}, 20)
};

