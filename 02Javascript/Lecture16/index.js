// Execution context
// Memory allocation:
// a = undefined
// b = undefined
// sum1 = undefined
// addNumber = fn
// sum2 = undefined

// Execution
// a = 10
// b = 20
// sum1 = 30
// sum2 = 15
// print 30,15


console.log(a,b);

var a = 10;
var b = 20;

const sum1 = addNumber(a,b);

function addNumber(num1,num2){
    let sum = num1+num2;
    return sum;
}



const sum2 = addNumber(6,9);
console.log(sum1,sum2);