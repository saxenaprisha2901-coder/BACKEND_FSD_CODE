const EventEmitter=require('events');
class MyEvent extends EventEmitter{

}
const events= new MyEvent();
events.once("greet", (name)=>{
    console.log("hello cse24 my name is ${name}`");//template literals - `$(var)`
})
events.on("exit" , ()=> {})
events.emit("greet","Prisha");
events.emit("exit");