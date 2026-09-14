
function fifth(){
  console.log("fifthh function is called");
}



function fourth(b){
  
    console.log("fourth function is called",b);
    fifth();
}



function third(){
   
    let b = 8;
    console.log("Thirde function is called",b);
    fourth(b);
}


function second(){
  console.log("scond function is called");

  third();
}


function first(){
  console.log("First function is called");

  second();
}


first();






