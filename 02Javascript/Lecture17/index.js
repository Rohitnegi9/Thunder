const obj1 = {
    name: "Rohit",
    age: 20,
    city: "dwarka",
    greet: function(){
        console.log(`Hello ${this.name}`);
    }
}



const obj2 = {
    balalnce: 70
}
// custom?
obj2.__proto__ = obj1;

console.log(obj2.greet());

// console.log(window);




// const arr = [10,20,30];

// arr.push(50);


// console.log(obj1.hasOwnProperty('name'));
// console.log(obj1.toString());