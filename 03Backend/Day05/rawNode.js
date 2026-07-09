import http from "http"

const Database = [
    {name:"Rohini", age: 10, email:"rohini@gmail.com", amount: 90},
    {name:"Rohan", age: 30, email:"rohan@gmail.com", amount: 190},
    {name:"Sohan", age: 20, email:"Sohini@gmail.com", amount: 900}
];

const server = http.createServer((req,res)=>{
   
    // get, post, put, patch , delete

    if(req.method == "POST" && req.url == "/user"){
        // wait kar, poora data user ne bheja hai, wo aane de
        let body = "";
        req.on("data", (chunk)=>{
            body+=chunk;
            // second storage save kar do
        })
        req.on("end",()=>{
            const user = JSON.parse(body);
            Database.push(user);
            res.end("User is Created successfully");
            // js object mein convert ho paaye
        })
    }





    else if(req.method=="GET" && req.url == "/user"){
        res.end(JSON.stringify(Database,null,2));
    }

    else if(req.method=="PATCH" && req.url=="/user"){
        let body = "";
        req.on("data", (chunk)=>{
            body+=chunk;
            // second storage save kar do
        })
        req.on("end",()=>{
            const user = JSON.parse(body);
            
            const findUser = Database.find((u)=> u.email == user.email);

            Object.assign(findUser,user);
            
            // for(const {key,value} of Object.entries(user)){
            //     findUser[key] = value;
            // }

            res.end("Information updated succesfully");
            // js object mein convert ho paaye
        })
    }
//  {name:"Rohini", age: 30, email:"rohini@gmail.com", amount: 190}

    else if(req.method=="POST" && req.url=="/user"){
        res.end("User Data is created successfully");
    }
    else if(req.method=="PATCH" && req.url=="/user"){
        res.end("User Data is patched successfully");
    }
    else if(req.method=="PUT" && req.url=="/user"){
        res.end("User Data is Put successfully");
    }
    else if(req.method=="DELETE" && req.url=="/user"){
        res.end("User Data is Deleted successfully");
    }
    if(req.method=="GET" && req.url == "/product"){
        res.end("Hello Coder Army");
    }
    else if(req.method=="POST" && req.url=="/product"){
        res.end("User Data is created successfully");
    }
    else if(req.method=="PATCH" && req.url=="/product"){
        res.end("User Data is patched successfully");
    }
    else if(req.method=="PUT" && req.url=="/product"){
        res.end("User Data is Put successfully");
    }
    else if(req.method=="DELETE" && req.url=="/product"){
        res.end("User Data is Deleted successfully");
    }
    else{
        res.end("Invalid Path");
    }


    
})


server.listen(3000,()=>{
    console.log("Server is lis listening at port 3000")
})