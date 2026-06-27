// const user1 = {
//     name: "Rohit",
//     age: 20,
//     city: "kotdwar",
//     increase: function(){
//         this.age++;
//     }
// }

// const user2 = {
//     name: "Mohan",
//     age: 11,
//     city: "Dwarka",
//     increase: function(){
//         this.age++;
//     }
// }

// const user3 = {
//     name: "Sohan",
//     age:70,
//     city: "Dholakpur",
//     increase: function(){
//         this.age++;
//     }
// }


// user1.increase();

// console.log(user1.age);

// 5 user 

class Person{
    constructor(name,age,city){
        this.name = name;
        this.age = age;
        this.city = city;
    }

    increase(){
        this.age++;
    }
};

const user1 = new Person("Rohit",20,"Dwarka");
const user2 = new Person("Sohan",10,"Delhi");
const user3 = new Person("Mohan",70,"Bihar");

// user1.increase();
console.log(user1);

// console.log(user1.__proto__.__proto__);

// console.log(user1,user2,user3);
// console.log(Person.prototype.__proto__);