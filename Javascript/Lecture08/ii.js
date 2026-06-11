// IIFE

// (function hello(){
//     console.log("Hello Ji");
// })();

// ()()



// javascript function ke andar kisi dusre function ko pass kar sakte hai
// Callback function


// function greet(){
//     console.log("Hello Ji");
// }

// // callback = greet

// function meet(callback){
//     console.log("Hello Meet");
//     callback();
// }

// // hello meet, hello ji
// meet(greet)




function greet(){
    console.log("Hello Ji");
}

function morning(){
    console.log("Hello Good Morning");
}


function meet(Callback){
    console.log("Hello Meet");
    Callback();
    console.log("I am done")
}

// Hardcode kar diya hai
// "Hello Meet"
// "Hello Ji"
// "I am done"

// // "Hello Meet"
// "Hello Good Morning"
// "I am done"
meet(greet);
meet(morning);








