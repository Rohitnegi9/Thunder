
// const arr = [3,54,18,11,20,19,2];


// const Callback = (num)=> num>10;

// for(let num of arr){
//     if(Callback(num))
//         answer.push(num);
// }



Array.prototype.filtered = function(Callback){
    const answer = [];

    for(let num of this){
         if(Callback(num))
            answer.push(num);
    }

    return answer;
}

const arr = [3,54,18,11,20,19,2];
// this = 

const ans = arr.filtered((num)=> num>10);
console.log(ans);


const a = [-10,3,5,18,-9,14];
// this = [-10,3,5,18,-9,14]
const answer = a.filtered((num)=> num>10);
console.log(answer);



// const answer = arr.filter((num)=> num>10);

// // answer = [54,18,11,20,19]
// console.log(answer);