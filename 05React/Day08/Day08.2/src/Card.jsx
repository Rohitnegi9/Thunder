import { useState } from "react"
import { CreateCartContext } from "./App";
import { useContext } from "react";


function Card({item}){
    
    const [added, setAdded] = useState(false);
    const {setTotalItem,setTotalPrice} = useContext(CreateCartContext);


    function removeItem(){
        setAdded(false);
        setTotalItem(prev=>prev-1);
        setTotalPrice(prev=>prev-item.price);
    }

    function addItem(){
        setAdded(true)
        setTotalItem(prev=>prev+1);
        setTotalPrice(prev=>prev+item.price);
    }
    
    return(
        <div>
            <h1>name: {item.name}</h1>
            <h2>price: {item.price}</h2>
            {
                added ? <button onClick={removeItem}>Remove</button>: <button onClick={addItem}>Add</button>
            }
        </div>
    )
}

export default Card;