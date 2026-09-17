import { useEffect, useState } from "react";


function App(){
   
  const [time, setTime] = useState(new Date().toLocaleTimeString());
  const [show,setShow] = useState(true);

  useEffect(()=>{
     
    if(!show)
      return;
   
    const intervalId = setInterval(()=>{
      setTime(new Date().toLocaleTimeString());
      console.log("Hello");
    },1000);

    
    return ()=>{
      clearInterval(intervalId);
    }
    

  },[show]);

  return (
    <>
    <button onClick={()=>setShow(!show)}>{show?"Show":"Hide"}</button>
    {
      show&&<h1>Current Time: {time}</h1>
    }
    </>
  )
}

export default App;