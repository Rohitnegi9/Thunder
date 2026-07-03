// Higher order function??? 

function increment(amount){

    function mul(num){
        console.log(num*amount);
    }

    return mul;
}

// const multiplier = increment(30);
// multiplier(10);
increment(30)(10);
// mul(10);
