//ecma scrpit
//functions:- (block of code)
//function fname(){
//block of code
//}
//function calling
//passing parameter in function
//console.log prints output on browsers console, for that we need a HTML file, now this js file will be linked to that html file using script tag.


function sayHello(a, b) {
    console.log("CSE 24 fsd");
    console.log(arguments);
    return a + b;
}

console.log(sayHello(3, 2));

//ARROW FUNCTION
const sayhello= () =>{
    console.log("arrowfunction")
}
sayhello();