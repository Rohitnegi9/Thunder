// class and object

class Person{
    constructor(name,age){
        this.name = name;
        this.age = age;
        this.x = 10;
    }

    greet(){
        console.log(`Hi ${this.name}`)
    }
};


const user1 = new Person("Rohit",20);
const user2 = new Person("Sohan",10);

console.log(user1);
console.log(user2);

// user1.greet();

const user3 = {
    name: "Mayank",
    age: 72,
    greet: function(){
        console.log(`Hi ${this.name}`)
    }
}

console.log(user3);


const arr = [10,20,30];

console.log(arr);