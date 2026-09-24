import { useState } from "react";



function App(){
    
  const [count, setCount] = useState(0);



  return(
  
  
  <>
    <h1>THis is your React application</h1>
    <h2>Counter is: {count}</h2>
    <button onClick={()=>setCount(0)}>Increment</button>
    <button onClick={()=>setCount(count=>count-1)}>Decrement</button>

  </>)

}


export default App;



