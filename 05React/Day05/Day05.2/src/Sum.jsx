import React from "react";

const Sum = React.memo(({num})=>{
    
    console.log("Sum render")

    return(
        <>
        <h1>Sum is: {num*(num+1)/2}</h1>
        </>
    )
})



export default Sum;