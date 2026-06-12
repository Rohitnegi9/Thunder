// // Callback ki baare mein pada th...
// // function ke andar dusre function as a argument kar sakte hai...

// function add(num1, num2){
//     return num1+num2;
// }


// function sub(num1,num2){
//     return num1-num2;
// }


// function mul(num1,num2){
//     return num1*num2;
// }



// function calculator(num1,num2,caller){
//     console.log("I am doing Calculation");
//     const result = caller(num1,num2);
//     console.log(`Your result ${result}`);
// }


// Callback = function(a,b){
//     return a/b;
// }

// // calculator(10,20,mul);
// // calculator(10,20,add);

// // calculator(30,5,function(a,b){
// //     return a/b;
// // })

// calculator(15,3,(a,b)=>{
//    return a/b;
// })