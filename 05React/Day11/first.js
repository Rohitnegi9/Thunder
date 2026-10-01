// a, b, c ,d


let count = 4;
let price = 10;

// count : first, fifth, sixth:
// price:  second, seven, nine:



function manipulatePrice(val){
    price = val;
    // second, seven, nine
}


function manipulateCount(val){
    count = val;
    // first, fifth, seventh
}


function first(){
     

    console.log(count);
}

function second(){
    console.log(price);
}

function third(){
    manipulatePrice(price+1);
}

function Fourth(){
    manipulateCount(count+1);
}


function App(){
    
}



function main(){
    App();
}

main()