import { useState,useRef } from "react";


function App(){
  
  const [time,setTime] = useState(0);
  // const [intervalId, setIntervalId] = useState(null);
  const intervalIdRef = useRef(null);

  console.log("Render");

  function handleStart(){
    
    if(intervalIdRef.current!=null)
      return;

    const intId = setInterval(()=>{
      setTime(prevTime=>prevTime+1);
    },1000);
  
    intervalIdRef.current = intId;
  }

  function handleStop(){
    clearInterval(intervalIdRef.current);
    intervalIdRef.current = null;
  }

  function handleReset(){
    clearInterval(intervalIdRef.current);
    intervalIdRef.current = null;
    setTime(0);
  }

  return(
    <>
    <h1>StopWatch: {time}</h1>
    <div>
      <button onClick={handleStart}>Start</button>
      <button onClick={handleStop}>Stop</button>
      <button onClick={handleReset}>Reset</button>
    </div>
    </>
  )
}

export default App;