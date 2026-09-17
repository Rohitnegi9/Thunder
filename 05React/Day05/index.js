
function third(num){
    console.log("third is render",num); 
}


function second(){
    let b = 30;
    let d = 12;

    // 1object: 200 MB;

    let c = d*d*d*d*d*d*d;
    console.log("second is render",b,d,c);
     
    third(b);
}

function first(){
    console.log("First is render");

    second();
}

first();