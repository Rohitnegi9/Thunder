// const user = {
//     name: "rohit",
//     age: 20,
//     email: "negi@gmail.com",
//     amount: 90
// }

// string ke form mein store hoti hai

// {
//   "name": "rohit",
//   "age" : 20,
//   "email": "negi@gmail.com",
//   "amount": 90
// }


// console.log(user.amount)
// console.log(user["name"])
// console.log(user["age"])
// console.log(user["amount"])
// console.log(user.name);

// const user = {
//     name: "rohit",
//     age: 20,
//     email: "negi@gmail.com",
//     amount: 90
// }

// user = null;
// delete user;
// console.log(user);
// garbage collector: Can I delete, should I delete

// creaate a new key: value

// user.adhar = 21030;
// // console.log(user);

// // update the value inside the object
// user.age = 29;

// delete user.email;
// console.log(user)


// const user = {
//     name: "rohit",
//     age: 20,
//     email: "negi@gmail.com",
//     amount: 90,
//     arr: [10,20,30,40],
//     greet: function(){
//         console.log("Hello Ji");
//     },
//     address: {
//      city: "dwarka",
//      pincode: 246149
//     }
// };


// user.greet();
// console.log(user.address.city);
// console.log(user.greet)


// const customer = {
//     name: "Rohit",
//     age: 20,
//     accountNumber: 124554,
//     balance: 40,
//     city: "kotdwar"
// };




// Keys ko print karana hai?
// [ 'name', 'age', 'accountNumber', 'balance', 'city' ]
// console.log(Object.keys(customer))

// [ 'Rohit', 20, 124554, 40, 'kotdwar' ]
// console.log(Object.values(customer))


// keys and values:
// [
//   [ 'name', 'Rohit' ],
//   [ 'age', 20 ],
//   [ 'accountNumber', 124554 ],
//   [ 'balance', 40 ],
//   [ 'city', 'kotdwar' ]
// ]
// console.log(Object.entries(customer));



// const customerkeys = Object.keys(customer);
// // console.log(customerkeys);
// // key = "name"
// for(const key of customerkeys){
//     console.log(key, customer[key] );
// }


// If I have an array, I can run for of loop here

// for(const key of Object.keys(customer)){
//     console.log(key);
// }


// for(const value of Object.values(customer)){
//     console.log(value);
// }

// 2D array
// [["name","Rohit"],["age",20],['accountNumber',12345]]

// [key,value] = ["age",20]
// for(const [key, value] of Object.entries(customer)){
//     console.log(key,value);
// }

// for of loop: array apply


// console.log(Object.keys(customer));


// const obj1 = {name: "Rohit"};
// const obj2 = obj1;

// obj2.name = "mohit"

// console.log(obj1);



