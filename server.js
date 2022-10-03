//INTRODUCTION TO NODE.JS

/*
The differences between Node.js and Vannila Js
    1. Vannila.js runs in the browser while Node.js runs in the Server
    2.The console is the terminal window
    3.In Node.js there is a global object not the window object
                (i) Getting the Global object console.log(global)
                            <ref *1> Object [global] {
                            global: [Circular *1],
                            clearInterval: [Function: clearInterval],
                            clearTimeout: [Function: clearTimeout],
                            setInterval: [Function: setInterval],
                            setTimeout: [Function: setTimeout] {
                                [Symbol(nodejs.util.promisify.custom)]: [Getter]
                            },
                            queueMicrotask: [Function: queueMicrotask],
                            clearImmediate: [Function: clearImmediate],
                            setImmediate: [Function: setImmediate] {
                                [Symbol(nodejs.util.promisify.custom)]: [Getter]
                            }
                            }
    4. Has a common core modules that we will explore
    5.We use CommonJS modules instead of ES6 modules (uses require instead of import)

 */

console.log('Hello World')
console.log(global)

//Importing modules to our project
const os = require('os');
console.log(os.type())
console.log(os.version())
console.log(os.homedir()) //The os home directory

console.log(__dirname)  //Directory name
console.log(__filename) //The file name

console.log('#############################')
//importing path to our project

const path = require('path')
console.log(path.dirname(__filename)) //directory
console.log(path.basename(__filename)) //filename
console.log(path.extname(__filename)) //file extension name eg .js
// Returns an object with the root,directory,basename,filename and extension
console.log(path.parse(__filename))