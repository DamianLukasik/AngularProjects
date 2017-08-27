var Text = {
	hi: 'Witaj',
	weather: 'słonecznie',
	show1: function(tab1) {
		angular.forEach(tab1, function (value, key) {
			console.log("Nazwa: " + key + ", wartość: " + value);
		});
	},
	show2: function(tab2) {
		for (var prop in tab2){
			console.log("Nazwa: " + prop + ", wartość: " + tab2[prop]);
		}
	},
	testValue: function(wart) {
		angular.lowercase("TeStUjEsZ wArTość: "+wart);
		if(angular.isString(wart)){
			console.log("Wartość jest stringiem");
		} else if(angular.isNumber(wart)){
			console.log("Wartość jest liczbą");
		} else if(angular.isObject(wart)){
			console.log("Wartość jest obiektem");
		}else if(angular.isFunction(wart)){
			console.log("Wartość jest funkcją");
		}else{
			console.log("Wartość nie jest ani stringiem, ani liczbą, ani obiektem czy funkcją");
		}
		angular.uppercase("koNiec");
	}
}

Text.hello = 'Hello';
Text["weather"] = 'deszczowo';

var propName = 'hi';
Text[propName] = 'Hi';

Text.ConsoleWrite = function(w) {
	console.log(w);
}

Text.testFunc = function() { alert('Test'); }
delete Text.testFunc;

var testFuncExist = "testFunc" in Text;

var StrtestFuncExist = (testFuncExist).toString() + " - " + String(0) + "  " + Number("0") 
+ (13423).toString(2) + "  " + (13423).toString(8) + "  " + (13423).toString(16) + "  " 
+ (3423.3645456).toFixed(3) + "  " + (3423.3645456).toExponential(3) + "  " + (3423.3645456).toPrecision(3) + "  "
+ parseInt("213.665") + "  " + parseFloat("213.665");

var myArray = new new Array();
myArray[0] = 12;
myArray[1] = "sad";
var testmyArray = angular.isArray(myArray);
myArray = testmyArray;

for(var i = 0; i < myArray.length; i++)
{
	console.log("Indeks "+i+": "+myArray[i]);
}
angular.forEach(myArray, function (value, key) {
	console.log(key+": "+value);
});

var myArray2 = [104,103,102,105,101,100];
myArray2.push(12);
myArray2.pop();

myArray2.reverse();
myArray2.unshift(23);
myArray2.shift();
myArray2.sort();

myArray.concat(myArray2.slice(2,5));
var StrmyArray2 = myArray2.join(":");