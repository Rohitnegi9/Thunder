import { useMemo, useState } from "react";
import Sum from "./Sum";
// import Prime from "./Prime"


function App(){
   
  const [count,setCount] = useState(100);
  const [number,setNumber] = useState(100000);

  console.log("App render")
  
  // function calculatePrimeNumber(){
  //   let totalPrime = 0;

  //   if(number>1)
  //     totalPrime++;

  //   for(let i=3;i<=number;i++){
  //     totalPrime++
  //     for(let j=2;j<i;j++){
  //       if(i%j==0){
  //         totalPrime--;
  //         break;
  //       }
  //     }
  //   }

  //   return totalPrime;
  // }


  // const prime = calculatePrimeNumber();

  const prime = useMemo(()=>{
    
    let totalPrime = 0;

    if(number>1)
      totalPrime++;

    for(let i=3;i<=number;i++){
      totalPrime++
      for(let j=2;j<i;j++){
        if(i%j==0){
          totalPrime--;
          break;
        }
      }
    }

    return totalPrime;
  },[number]);



  return(
    <>
    <h1>Counter is:{ count}</h1>
    <button onClick={()=>setCount(count+1)}>Increment</button>
    <h2>Number is: {number}</h2>
    <button onClick={()=>setNumber(number+10000)}>Increment Number</button>
    <h3>Total Prime number: {prime}</h3>
    {/* <Prime primeNumber={number}></Prime> */}
    <Sum num={count}/>
    </>
  )

}

export default App;