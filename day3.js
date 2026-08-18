//promises for asynchronous is an object.
// Promises are objects representing the eventual completion or failure of an asynchronous operation, serving as the foundation for modern JavaScript asynchronous programming.
//js is a single threaded programming language
//stages:- pending , fulfill , rejected

const promiseOne = new Promise((resolve, reject) => {
    console.log("Promise task 1");

    let msg = true; // Change to false to test reject()

    if (msg) {
        resolve("Promise passed by using resolve");
    } else {
        reject("Message using promises failed");
    }
    setTimeout(()=>{
        console.log(resolve());
    },2000)
});

promiseOne
    .then((result) => {
        console.log(result);
    })
    .catch((error) => {
        console.log(error);
    });
    