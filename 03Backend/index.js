

// function validator(obj){
     
//     const {email,age,password,name} = obj;
    
//     // email: rohit@gmail.com
//     // email: string: @, .com, .in, gmail, yahoo, trim

//     // password: "Rohit@345"
//     // Capital, specila,size>=8, number

//     // age

//     //

// }


// // const signupSchema = z.object({
// //     name: z.string(),
// //     age: z.number(),
// //     email: z.email(),
// //     password: // password
// // })


// // // data = {name:"Rohit",age: 10, email: 'rohit@gmail.com', password: roifjas}
// // signupSchema.safeParsee(data)







const StrikeServer = [
    "https://12.3.4.6",
    "https://19.3.4.5",
    "https://21.8.4.6"
]

import express from "express"

const app = express();

let index = 0;


function fetechServer(){
    
    const serverName = StrikeServer[index];
    index++;
    index = index%StrikeServer.length;

    return serverName;
}


app.use(async (req,res)=>{
    
    const server = fetechServer();


    // Code aajayega us server ko request kar sakta ho

   const response = await CallingServer(server,req.body);

   // user ko response bhej do
   

})



app.listen(5000,()=>{
    console.log("Load Balancer is listening at port 3000")
});

