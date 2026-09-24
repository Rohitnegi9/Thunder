import { useState } from "react"


function Cart(){
   
    const [foodItem, setFoodItem] = useState(["Orange ","Apple ","Banana "]);
    

    function increment(){
       
        setFoodItem([...foodItem, "mango "]);
    }

    return (
        <>
        <h1>My Food Item:</h1>
        <ul>
            {
                foodItem.map((food,index)=><li key={index}>{food}</li>)
            }
        </ul>
        <button onClick={increment}>Increment</button>
        </>
    )


}

export default Cart;



