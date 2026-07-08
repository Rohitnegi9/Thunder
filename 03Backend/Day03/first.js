// 1.0.0
// patch: bug fixes: 1.0.1
// minor update: 1.1.0
// major: 

function add(num1, num2){
   
   if(typeof num1 == "number" && typeof num2 =="number" && typeof num2 =="number") 
   return num1+num2+num3;
}

function sub(num1,num2){
    if(typeof num1 == "number" && typeof num2 =="number") 
    return num1-num2;
}

function mul(num1,num2){
    if(typeof num1 == "number" && typeof num2 =="number") 
    return num1*num2;
}


function div(num1,num2){
    if(typeof num1 == "number" && typeof num2 =="number") 
    return num1/num2;
}

function square(num1){
    return num1*num1;
}

module.exports = {add,sub,mul,div,square};


// add(2,3) = 5