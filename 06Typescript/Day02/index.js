// array:
// let arr: (number | string)[] = ["Rohit",10];
// console.log(arr);
// 0: string, 1: number, 2: boolean
// Tuples
// let arr: [string,number,boolean] = ["Rohit",10,false];
// 0: string, 1: number, 2: boolean
// arr.push("Mohit");
// arr.push("sohan");
// arr.push(10);
// console.log(arr);
// function order():[string,number]{
//     return ["101abc", 3287];
// };
// const orderStatus = order();
// console.log(`My Order Id is: ${orderStatus[0]}`);
// console.log(`My Order Price is: ${orderStatus[1]}`);
// Type aliases
// type Student = {name:string, age: number, isPresent: boolean};
// let s1: Student = {name:"Rohit", age: 10, isPresent: true};
// // const s2 = s1;
// // console.log(s2);
// type User = {name: string, age:number};
// let u1: User = s1;
// console.log(u1);
// this is not allowed in TS
// let u2: User = {name:"Rohit", age: 10, isPresent: true};
// type Student = {name: string, rollNumber: number, age: number, className:number};
// type Teacher = {name: string, age: number, salary:number, subject: string};
// type Staff = {name:string, age: number, salary:number, desgination: string};
// // type Person = {name: string, age: number}
// // function showProfile(p: Person){
// //    console.log(`Name: ${p.name} & age: ${p.age}`);
// // }
// // function showProfile(p: Student | Teacher | Staff){
// //     console.log(`Name: ${p.name} & age: ${p.age}`);
// // }
// function showProfile(p: Student | Teacher | Staff){
//     if("salary" in p)
//     console.log(`Name: ${p.name} & age: ${p.age} & salary:${p.salary}`);
//     else
//        console.log(`Name: ${p.name} & age: ${p.age}`); 
// }
// let s1: Student = {name:"Rohit", age: 10, rollNumber:12, className: 7};
// let t1: Teacher = {name:"Mohit", age: 40, salary:5000, subject:"Maths"};
// let st: Staff = {name:"Sunil", age: 30, salary: 2000, desgination:"Peon"};
// showProfile(s1);
// showProfile(t1);
// showProfile(st);
// student
// teacher
// Employee
// Interfaces
// type Student = {name:string, age: number};
// interface Person{
//     name: string,
//     age: number
// }
// interface Person{ isSalary: number}
// type Person = {name: string,age: number}
// type Student = Person & {className: string, fees: number}
// interface Student extends Person{
//     className: string,
//     fees: number
// }
// interface Teacher extends Person{
//     salary: number,
//     subject: string
// };
// // interface Student{
// //     fees: number
// // }
// const p1: Person = {name:"Rohit", age: 18}
// const s1: Student = {name:"Moha", age: 19, className: "Fifth", fees:40};
// console.log(p1);
// console.log(s1);
// Union Type: 
// type PaymentId = number | string;
// let p1: PaymentId = 10;
// p1 = "24"
// type Person = {name: string, age: number};
// type address = {city: string, pincode: number};
// let p1: Person & address = {name:"Rohit", age: 10, city:"kotdwar", pincode: 23142};
// let orderStatus = "pending";
// orderStatus = "shippped";
// type OrderStatus = 'pending' | 'shipped' | 'delivered'
// // "pending", 'shipped', 'delivered'
// let status: OrderStatus = 'pending';
// // 
// type Dice = 1|2|3|4|5|6;
// let d1: Dice = 1;
// d1= 5
// readonly, as const
// type Student = {name: string , rollNumber: number, age: number}
// const s1 = {
//     name: "Rohit",
//     age: 10,
//     rollNumber: 18
// } as const;
// console.log(s1);
// s1.name = "Rohit Ji";
// enum OrderStatus {
//     Pending = 'pending',
//     Shipped = 'shipped',
//     Delivered = 'delivered'
// };
// let status: OrderStatus = OrderStatus.Pending;
// status = OrderStatus.Delivered;
// type OrderStatus = 'pending' | 'shipped' | 'delivered'
// let status: OrderStatus = 'pending';
// status = 'delivered'
// pickupOrder(OrderStatus.Shipped)
// enum Direction { Up =9 , Down = 4, Left = 3, Right = 13 }
// console.log(Direction.Up);
// function add(a: number, b:number): number{
//     return a+b;
// }
// console.log(add(3,4));
let add = (a, b) => a + b;
console.log(add(9, 4));
export {};
