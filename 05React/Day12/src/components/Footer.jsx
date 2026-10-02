import { useStore } from "../store";

function Footer(){
    
    const count = useStore((state)=>state.count);
    const setNumber = useStore((state)=>state.setNumber);
   
    return(
        <>
        <h1>I am bottom of Count: {count}</h1>
        <button onClick={()=>setNumber(5)}>IncreaseNumber</button>
        </>
    )
}

export default Footer;