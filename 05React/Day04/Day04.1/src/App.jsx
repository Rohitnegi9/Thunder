import { useState } from "react";
import Sum from "./Sum";

function App(){
  const [count,setCount] = useState(0);
   


  return (
    <>
   
    <h1>Counter is: {count}</h1>
    <button onClick={()=>setCount(count+1)}>Increment</button>
    <button onClick={()=>setCount(count-1)}>Decrement</button>
    <Sum num={count}></Sum>
    </>
  )
}

export default App;