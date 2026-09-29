import { useState } from "react";


// function Home({count,setCount}){
    
//     return(
//         <>
//         <h1>Welcome to Home Page</h1>
//         <h2>Counter is : {count}</h2>
//         <button onClick={()=>setCount(count=>count+1)}>Increment</button>
//         </>
//     )
// }

function Home(){
    
    const [count,setCount] = useState(0);

    return(
        <>
        <h1>Welcome to Home Page</h1>
        <h2>Counter is: {count}</h2>
        <button onClick={()=>setCount(count=>count+1)}>Incrtement</button>
        </>
    )
}

export default Home;