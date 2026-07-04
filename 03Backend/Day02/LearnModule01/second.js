console.log("I am processing the payment");


function payment(num1){
   console.log(`${num1} is completed`);
}

// exports.hello = function(){
//     console.log("Hello Ji");
// }

// exports.add = function(){
//     console.log("I am adding the number");
// }

function sub(){
    console.log("I am sub");
}

module.exports = {payment,sub};


// module = {
//     exports:{payment,sub}
// }


// payment(30);
// module.exports = {}
// module.exports = {payment, hello}
// module.exports = payment

// module.exports = {payment, hello}
// module.exports = payment

// module.exports = {hello,add};

// module = {
//     exports:{
//         hello: hello,
//         add: add,
//     }
// }


