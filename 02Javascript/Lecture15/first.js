console.log("Start");


async function github(){
    const response = await fetch("https://api.github.com/users?per_page=20");
    const data =  await response.json();
    // Body ke andar data hai, usko read karke js object convert karo

   console.log(data);
}

github();

// UI ke andar display

// code: header ko display
// code: Footer ko display
console.log("End");

// Promise<pending>


// const jsObject = {
//     name: "Rohit",
//     age: 20,
//     logIn: true,
//     a: undefined,
//     b: function(){

//     }
// }


// const jSon = `{
//     "name":"Rohit",
//     "age":20,
//     "login":true,
//     "arr": [20,11,70]
// }`

// string, number, boolean, null, object, array
// String hai


// const obj = {
//     name: "Rohit",
//     age: 20
// }


// const jsObject = {
//     name:"Rohit",
//     age: 20,
// }

// // jsobject --> JSON
// const a = JSON.stringify(jsObject);

// // "name"
// // JSON --> jsObject
// const b = JSON.parse(a);

// console.log(b);


// {
//     "name":"Rohit",
//     "age":20
// }