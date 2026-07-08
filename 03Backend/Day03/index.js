// const http = require("http");


// const server = http.createServer((req,res)=>{

//     res.end("Hello Coder Army");

// })

// server.listen(9000,()=>{
//     console.log("Server is listening at port 9000");
// });

// comment.length<=10000000, api call karna


const validator = require('validator');


const email = 'rohit@gmail.com'
const password = "Rohi"
const comment = "dsakjfbsakj sfbjsdabdfsa safskalk"

console.log(validator.isEmail(email));
console.log(validator.isStrongPassword(password));

// format check kar rha hu
// Password hai, kya wo strong hai?
// frontend: Is data ko validate kar deta hu....

// custom code likhu???
// Internet: Code ko already likh rkha hoga, mein direct us code use kar lunga
// validator.isEmail('foo@bar.com')