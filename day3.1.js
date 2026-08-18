//create promise that will print username and password using resove and if username and passwod not found then it will call reject state and  print error
new Promise((resolve, reject)=>{
setTimeout(function(){
    
    let err = false;
    if(!err){
        resolve("user:ABC, password:123");
    }
    else{
        reject("error: user not found");
    }
}, 2000);
}).then((result)=>{
    console.log(result);
}).catch((error)=> {
    console.log(error);
}); 
async function test() {
  console.log("message:1");

  try {
    const response = await fetch("./student.json");
    const stdn = await response.json();
    console.log(stdn);
    console.log("message 3");
    return stdn;
  } catch (error) {
    console.error("Error:", error);
  }
}

test();