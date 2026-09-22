import {CreateCartContext} from "./App"
import { useContext } from "react";

function CartValue(){
         
    const {price,totalItem} =useContext(CreateCartContext);
   
    return(
        <>
        <h1>Total item added: {totalItem}</h1>
        <h2>Total Price: {price}</h2>
        </>
    )
}

export default CartValue;