// pending, fullfilled, rejected

// const p1 = fetch("https://api.github.com/users?per_page=20");




// const p2 = p1.then((response)=>{
//     return response.json();
// })




// p2.then((data)=>{
//     console.log(data);
// })

// fetch("https://api.github.com/users?per_page=20")
// .then((response)=>{
//     if(!response.ok)
//         throw new Error("Unable to fetch data");
//     return response.json();
// })
// .then((data)=>{
//     console.log(data);
// })
// .catch((error)=>{
//     console.log(error);
// })
// .finally(()=>{
//     console.log("I am final step");
// })



// fetch("https://api.github.com/users?per_page=20")
// .then((response)=>{
//     return response.json();
// }).then((data)=>{
//     console.log(data);
// })


// How to create a promise


// const p1 = new Promise((resolve,reject)=>{
     
//     setTimeout(()=>{
//        resolve({name:"Rohit",age:20});
//     },1000);
    
//     // reject("Error occured");


// })


// console.log(p1);


// p1.then((res)=>{
//     console.log(res);
// })
// .catch((error)=>{
//     console.log(error);
// })

// const p1 = fetch("https://api.github.com/users?per_page=20");

// p1.then((res)=>{
//    console.log(res);
// })


// console.log("hello jo");