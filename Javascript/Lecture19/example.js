
// let balance = 200;

// balance isko private mein bana du


// const user1 = {
//     balance: 1000,
//     credit: function(amount){
//         if(typeof amount == "number")
//         this.balance+=amount;
//     },
//     debit: function(amount){
//         if(typeof amount == "number" && amount<=this.balance && amount>0)
//         this.balance-=amount;
//     },
//     checkBalance: function(){
//         console.log(this.balance);
//     }
// }


// // user1.credit(170);
// // user1.credit(10);
// // user1.debit(5);
// // user1.checkBalance();
// user1.balance = "Rohit";

// user1.checkBalance();


// function bank(){

//     let balance = 200;

//     function credit(amount){
//         if(typeof amount == "number")
//            balance+=amount;
//     }

//     function debit(amount){
//         if(typeof amount == "number" && amount<=balance){
//             balance-=amount;
//         }
//     }

//     function checkBalance(){
//         console.log(balance);
//     }
    
//     // return {
//     //     credit: credit,
//     //     debit: debit,
//     //     checkBalance: checkBalance
//     // }

//     return {
//         credit,debit,checkBalance
//     }
// }

// // a = [credit,debit,checkBalance]
// // const a = bank();
// // a[2]();

// const user = bank();
// user.credit(200);
// user.checkBalance();



// function bank(){
    
//     let balance = 200;

//     return {
//     credit: function(amount){
//         if(typeof amount == "number")
//          balance+=amount;
//     },
//     debit: function(amount){
//         if(typeof amount == "number" && amount<=balance && amount>0)
//          balance-=amount;
//     },
//     checkBalance: function(){
//         console.log(balance);
//     }

//   }

// }

// const user1 = bank();
// user1.credit(100);
// user1.debit(50);
// user1.checkBalance();







