const http = require('http');
const url = require('url');

const Database = [{name:"Rohit",age:10,email:"negirohit@gmail.com"},
    {name:"Mohit",age:20,email:"neymar@gmail.com"}
]


function createUser(user){
    Database.push(user);
}

// user = {email: "neymar@gmail.com"}

function DeleteUser(user){
    // user.email
    for(let i=0;i<Database.length;i++){
        if(Database[i].email == user.email){
            Database.splice(i,1);
            break;
        }
    }
    
}


// user = {email:"neymar@gmail.com", age:11}

// function patchUpdate(user){
//     for(let i=0;i<Database.length;i++){
//         if(Database[i].email == user.email){

//         }
//     }
// }


const server = http.createServer((req,res)=>{
    
    console.log(req.url);
    const parsed = url.parse(req.url, true);
    const operation = parsed.pathname.slice(1);


    if(operation=="deleteUser"){
        DeleteUser(parsed.query);
        res.end("I have delete the user");
        return;
    }

   else if(operation == "createUser"){
        createUser(parsed.query);
        res.end("User is created");
        return;
   }

   else if(operation == "getUser"){
        res.end(JSON.stringify(Database));
        return;
   }

   res.end("I am available");
    

})

server.listen(3000,()=>{
    console.log("Server is listening at port 3000");
})