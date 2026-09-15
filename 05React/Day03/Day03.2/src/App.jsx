import { useState } from "react";


function App(){
   
  let [count,setCount] = useState(0);
   
  function incrementNumber(){
    count = count+1;
    setCount(count);
  }

  return (
    <>
    <h1>Counter: {count}</h1>
    <button onClick={incrementNumber}>Increment</button>
    </>
  )
}


export default App;