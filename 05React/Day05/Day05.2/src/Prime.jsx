import React from "react";

const Prime = React.memo(({primeNumber})=>{
    

    function calculatePrimeNumber(){
    let totalPrime = 0;

    if(primeNumber>1)
      totalPrime++;

    for(let i=3;i<=primeNumber;i++){
      totalPrime++
      for(let j=2;j<i;j++){
        if(i%j==0){
          totalPrime--;
          break;
        }
      }
    }

    return totalPrime;
  }



    return (<>
      <h3>Total Prime number: {calculatePrimeNumber()}</h3>
    </>)

})

export default Prime;