// const arr1 = [10,20,30,40,50]

// const arr2 = arr1;

// arr2[2] = 84;

// console.log(arr1);


// 1 Dimension array:
// 2 Dimensional array: array ke andar array
// [[10,20,30],[90,9,11]]
// const arr = [[10,20,30],[40,50,69],[20,11,18],[43,52,63]];

// console.log(arr[2].length)

// 2 dimensional: arr.length: Number of rows kitni hai: number of one dimension array kitne hai
// console.log(arr.length);

// console.log(arr[0][2]);


// for(let row=0;row<arr.length;row++){
//     for(let col=0;col<arr[row].length;col++){
//         console.log(arr[row][col]);
//     }
// }

// const arr = [[10,20,30],[40,50,69],[20,11,18],[43,52,63]];
// // row = [40,50,69]
// for(let row of arr){
//     for(let col of row){
//         console.log(col);
//     }
// }


// 3D array: [[10,20],[30,11,[89,21,11]]]


// 1D array, 2D array:

// Factual
// const num1 = [10,20,30,40,50,[20,30,70]];
// const num2 = [42,12,54,11];
// const num3 = [5,1,453,12,53]

// // const num = num1.concat(num2,num3);
// // // num1.push(num2);

// // console.log(num);
// // spread operator
// Important
// const num = [...num1,...num2,...num3]
// // const num = [num1,num2,num3]
// // [10,20,30,40,50,42,12,54,11,5,1,12,53]

// console.log(num);


// const num = [10,20,30,40,90]

// // const first = num[0];
// // const second = num[1];

// const [first,second,bhains, ...remaining] = [10,20,30,40,90,3812,2];
// // remaining array: Rest operator: (...)
// console.log(first,second,bhains,remaining)
// It is very important topic

// left hand: rest operator
// Right hand: spread operator

// ...

