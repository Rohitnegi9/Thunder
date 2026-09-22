import { CountContext } from "../App";
import { useContext } from "react";

function Display(){
     
   const {count} = useContext(CountContext);

    return(
        <>
        <h1>I will display something: {count}</h1>
        </>
    )
}

export default Display;