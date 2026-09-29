import { useState } from "react";
import Counter from "./Counter";


function App(){
   
  const [timer, setTimer] = useState(['First',"Second","Third"]);
  
  function increment(){
    setTimer(["Fourth",...timer]);
  }

  return(
    <>
      <h1>This is our Counter Table</h1>
      <button onClick={increment}>Push</button>
      <div style={{display:"flex", justifyContent:"center", gap: "30px"}}>
      {
        timer.map((value,index)=> <Counter key={value} name={value}></Counter>)
      }
      </div>
    </>
  )

}

export default App;