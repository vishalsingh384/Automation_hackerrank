//Promises are syntactical sugar of callbacks
///Promises are better than callbacks

const fs=require("fs");

//Promises has three stages: 1.Pending    2.fulfill(we use->then)     3.reject(we use->catch)
let promiseThatFileWillBeRead=fs.promises.readFile("f1.txt");
console.log(promiseThatFileWillBeRead);
// let promiseAgain=fs.promises.readFile("f2.txt");
// console.log(promiseThatFileWillBeRead);
promiseThatFileWillBeRead.then(printData);//this means when promise is fulfilled call printData
promiseThatFileWillBeRead.catch(printError);//this means when promise is rejected errorData will be called

// promiseThatFileWillBeRead.then(promiseAgain);//chaining
// promiseAgain.then(printData);

function printData(data){
    console.log("promise is fulfilled");
    console.log(data+"");
}

function printError(err){
    console.log(err);
}