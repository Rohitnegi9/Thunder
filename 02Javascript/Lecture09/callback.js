

// arr.sort((a,b)=>a-b);



const arr = [10,20,1,3,98,8,11];


// Callback = (a,b)=> a>b;

Array.prototype.sorting = function(Callback){
    
    // Bubble sort
    for(let i=0;i<arr.length;i++){
    for(let j=0;j<arr.length-1;j++){
        if(Callback(arr[j],arr[j+1])){
            let temp = arr[j];
            arr[j] = arr[j+1];
            arr[j+1] = temp;
        }
    } 
   }
}


arr.sorting((a,b)=> a>b);


// a>b: a and b swap
// dont swap them 

console.log(arr);


// const obj = {
//     name: "Rohit",
//     age: 20
// }


// obj.sorted = function(){
//     console.log("sorted");
// }

// console.log(obj);

