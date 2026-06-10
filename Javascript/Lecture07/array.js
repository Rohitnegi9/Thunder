// Homework: sorting function , how does it work?

// const names = ["Rohit", "Mohan", "Sohan","Yash","Rajat", 'rohit'];

// Ascii table: R as r: A: 65 B; 66 ,   a: 97
// sort: ascending order 

// names.sort();
// names.reverse();

// console.log(names)


// const num = [10,20,7,101,23,78,4];
// ["10","20","7","101","23","78","4"]
// it is considering each element as string by default
// "10" , "4"
// num.sort();
// 4 7 10 20 23 78 101

// ascending order
// num.sort((a,b)=>a-b);
// Implement kiya hoga: 
// descending order:
// num.sort((a,b)=>b-a);
// console.log(num);


// const num = [10,20,7,101,23,78,4];
// // string ke jaise hur ek chej ko treat kar rha hai?
// num.sort();

// const arr = [10,"Rohit",true,98,"rohan",null,{name:"Rohit",age:20}];

// arr.sort();
// Hur ek ko string mein convert kar dunga, uske baad sort karunga....
// ["10","Rohit","true","98","rohan","null"]
// console.log(arr);