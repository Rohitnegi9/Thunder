// callback function
// function add(a: number,b:number): number{
//     return a+b;
// }
// type cal = (a:number,b:number)=> number;
// const add: cal = (a,b)=>a+b;
// const mul: cal = (a,b)=>a*b;
// const sub: cal = (a,b)=>a-b;
// const div: cal = (a,b)=>a/b;
// const square: (a:number)=>number = (a)=>a*a;
// function calculate(a:number, b:number, callback:cal): number{
//     return callback(a,b);
// }
// console.log(calculate(4,6,add));
// console.log(calculate(4,6,sub));
// console.log(calculate(4,6,mul));
// console.log(calculate(10,2,div));
// console.log(calculate(10,3,square));
// function overloading
// function process(val:string):string;
// function process(val: number): number;
// function process(val: string | number): string|number{
//     if(typeof val === "string")
//     return val.toUpperCase();
//     else
//         return val*val;
// }
// const answer = process("rohit");
// const secondanswer = process(20);
// console.log(answer);
// console.log(secondanswer);
// const student = {
//     name: "Rohit",
//     age: 10,
//     rollNumber: 20
// };
// const teacher = {
//     name: "Mohit",
//     age: 20,
//     salary: 500
// };
// function processData(val:{name:string,age:number}){
//     if("rollNumber" in val){
//         console.log(val.rollNumber);
//     }
//     else if("salary" in val){
//         console.log(val.salary);
//     }
// }
// processData(student);
// processData(teacher);
// instance of
// class Dog{
//     bark(){
//         console.log("Bhau Bhau Bhau Bhau");
//     }
// };
// class Cat{
//     meow(){
//         console.log("Meow meow meow meow");
//     }
// }
// function animalSound(animal: Dog | Cat){
//    // if animal type Dog: animal.bark()
//    // if animal type Cat: animal.meow();
//    if(animal instanceof Dog){
//      animal.bark();
//    }
//    else if(animal instanceof Cat){
//     animal.meow();
//    }
// }
// const doggy = new Dog();
// const billi = new Cat();
// animalSound(doggy);
// animalSound(billi);
// function assertNever(value: never): never {
//   throw new Error(`Unhandled case:${JSON.stringify(value)}`);
// }
// function render(state: RequestState): string {
//   switch (state.status) {
//     case "loading": return "Loading…";
//     case "success": return state.data.name;
//     case "error": return state.message;
//     default: return assertNever(state);
//   }
// }
// state.status : loading, sucesss. error
// Generic
// function overloading
// function getFirst(arr: string[] | number[]): string | number{
//     return arr[0];
// }
// function getFirst<T>(arr: T[]): T{
//     return arr[0];
// }
// const answer1 = getFirst([10,20,30]);
// const answer2 = getFirst(["Amir","Kartik","Vijay"]);
// function processData<T>(val: T): T{
//     if(typeof val === "string"){
//         return val.toUpperCase();
//     }
//     else if(typeof val === 'number'){
//         return val*val;
//     }
// };
// let answer1 = processData("kartik");
// let answer2 = processData(14);
// let a = 10;
// const b = 20;
// How to handle extends
// type Person = { name: string };
// type Student = { name: string; age: number };
// function getNamed<T extends { name: string }>(value: T): T {
//   console.log(value.name);
//   return value;
// }
// const item = getNamed({ name: "Rohit", age: 25 });
// console.log(item);
// Key of Property
const user = {
    name: "Rohit",
    age: 20,
    salary: 200
};
function getProperty(obj, key) {
    return obj[key];
}
console.log(getProperty(user, "age"));
export {};
