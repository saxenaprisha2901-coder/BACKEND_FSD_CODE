//Synchronus and asynchronus 

console.log("task3");``
function hello(){
    console.log("task 1");
}
hello();
console.log("task2");

function hello(){
    console.log("task 1");
    setTimeout(function(){
        console.log("task 2");
    },2000)
}
hello();
console.log("task 3");

//CALLBACK:passed as an argument to another function and called inside the function
function hello(n1,n2,cb){
    console.log("task1");
    return n1+n2;
    cb();
}
let a=10;
let b=20;
console.log(hello(a,b));
function hi(){
    console.log("say hi");
}
hello(a,b,hi);
hello(a,b,demo);

function hi(){
    console.log("hi");
}
function demo(){
    console.log("demo");
}
hi();
demo();
function text(){
    console.log("learning FSD");
}
text();

Arrow Function
function hello()
{
    console.log("Task 1");
    setTimeout(function(){
        console.log("Task 2");
    },2000)
    setTimeout(function(){
        console.log("Task 4");
    },4000)
}
hello();
console.log("Task 3");