import { useStore } from "../store";

function Body(){
    
    const number = useStore((state)=>state.number);
    const setCount = useStore((state)=>state.setCount);

    return(
        <>
        <h1>I am the body</h1>
        <h2>I will display {number}</h2>
        <button onClick={setCount}>IncreaseCount</button>
        </>
    )
}

export default Body;