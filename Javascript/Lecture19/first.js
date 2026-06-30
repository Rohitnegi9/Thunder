// globalThis
// window: It is global object in browser(chrome)
// global: It is global object in nodeJs Environment
// globalThis points to the global object of that enviroment
// console.log(globalThis);

// "use strict"

// let d = 10

// console.log(d);

// function add(num1,num2){
//     return num1+num2;
// }


// console.log(add(3,4));

// Non strict mode and strict mode:
// window: this keyword points to global object
// nodeJs: this keyword points to empty object
// Inside a method in a Object, this keyword will point to the object who invoked that method(true for both window and node)


// Non strict mode: 
// Both Nodejs and Window: Inside a function, this will point to global object

// Strict mode
// Both Nodejs and Window: Inside a function, this will point to undefined

// "use strict"

// console.log(this);


// const user1 = {
//     name: "Rohit",
//     age: 10,
//     greet: function(){
//         console.log(this);
//     }
// }

// const user2 = {
//     name: "Mohit",
//     age: 11,
//     greet: function(){
//         console.log(this);
//     }
// }

// // this == user1

// user2.greet();

// 'use strict'


// function greet(){
//     console.log(this);
// }


// greet();


// call apply bind




// class mein sikhaya th

// const user1 = {
//     name:"Rohit",
//     age:10,
//     amount: 100
// }

// const user2 = {
//     name:"Mohit",
//     age:19,
//     amount:70
// }

// function increment(umar,paisa){
//     this.age = umar;
//     this.amount+=paisa;
//     console.log(this);
// }

// this == user1

// increment.call(user1);
// increment.call(user2);
// increment.call(user1,30,300);
// increment.apply(user1,[30,300]);

// const ref = increment.bind(user1,30,300);

// ref();



// arrow function: this keyword hota hi nahi hai

// const user = {
//     name: "Rohit",
//     age: 20,
//     increment: ()=>{
//         this.age++;
//     } 
// }


// user.increment();

// console.log(user.age);

// Strict or non strict:
// arrow function borrow the this keyword from the nearest outer scope...

// "use strict"

// console.log(this);

// const a = ()=>{
//     console.log(this);
// }

// a();

// "use strict"

// function greet(){
    
//     // console.log(this)
//     const a = ()=>{
//         console.log(this);
//     }

//     a();
// }

// greet();




// const watch = {
//     timer: 0,
//     stopWatch: function(){
//         // console.log(this);
//         // setInterval(function(){
//         //    this.timer++;
//         //    console.log(this.timer);
//         // },1000);

//         setInterval(()=>{
//            this.timer++;
//            console.log(this.timer);
//         },1000);

        
//     }
// }


// watch.stopWatch();

"use strict"


const user = {
     name:"Rohit",
     age: 10,
     greet: ()=>{
        console.log(this);
     }
}

user.greet();