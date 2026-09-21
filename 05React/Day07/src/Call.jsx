import { useState, useCallback } from "react";


function Call(){
    const [count,setCount] = useState(1);

    
    console.log("Render");

    // function handleDisplay(){
    //     console.log("Hello ji");
    // }

    const handleDisplay = useCallback(()=>{
        console.log("Hello ji",count);
    },[count]);


    return(
        <>
        <h1>Counter: {count}</h1>
        <button onClick={()=>setCount(count=>count+1)}>Increment</button>
        <button onClick={handleDisplay}>Console</button>
        </>
    )
}

export default Call;