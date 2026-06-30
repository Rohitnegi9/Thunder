
// var: Block scope izzat ni karta, functional scope ki respect karta hai

// if(true){
//     var d = 9;
// }


// let a = 10;
// const b = 20;
// function greet(){
//     let d = 10;
//     console.log("hello");
// }


// greet();
// console.log(d);



// let a = 10;


// function greet(){
  
//     let a = 90;
//    function meet(){
//         let a = -5;
//         console.log(a);
//    }

//    meet();

   
// }

// greet();



function counter(){
    
    let count = 0;
  
    function increment(){
        // console.log("I am incremented");
        count++;
        console.log(count);
    }

    return increment;
}


const c = counter();
c();
c();






