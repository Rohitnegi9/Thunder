

function validator(obj){
     
    const {email,age,password,name} = obj;
    
    // email: rohit@gmail.com
    // email: string: @, .com, .in, gmail, yahoo, trim

    // password: "Rohit@345"
    // Capital, specila,size>=8, number

    // age

    //

}


// const signupSchema = z.object({
//     name: z.string(),
//     age: z.number(),
//     email: z.email(),
//     password: // password
// })


// // data = {name:"Rohit",age: 10, email: 'rohit@gmail.com', password: roifjas}
// signupSchema.safeParsee(data)