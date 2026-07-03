// Exectuion context
// Memory allocation phase
// a = <uninitlized>(Temporal dead zone)
// b = <unitialized>(Temporal dead zone)

// Exectuion phase
// a = 10
// b = 20
// 10,20


// Execution context , 
// a = 10
// b = 20
// sum1= <uninitlized>(Temporal dead zone)
// addNumber =  <unitialized>(Temporal dead zone)

// Hoisting ??




let a = 10;
const b = 20;



const addNumber = function(num1,num2){
    return num1+num2;
}

const sum1 = addNumber(a,b);




console.log(sum1);