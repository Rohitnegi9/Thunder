import { useState, useContext } from "react";
import { CountContext } from "../App";


function Counter(){
     
    const {count,setCount} = useContext(CountContext);
  
    return(
        <>
        <h1>Counter is: {count}</h1>
        <button onClick={()=>setCount(count=>count+1)}>Increment</button>
        <button onClick={()=>setCount(count=>count-1)}>Decrement</button>
        </>
    )
}

export default Counter;