import { useState,useRef } from "react";


function Forms(){

    const nameRef = useRef(null);
    const ageRef = useRef(null);
    const emailRef = useRef(null);
    const passRef = useRef(null);

    console.log("Render");

    function handleSubmit(e){
        e.preventDefault();
        console.log(nameRef.current.value);
        console.log(ageRef.current.value);
        console.log(emailRef.current.value);
        console.log(passRef.current.value);
    }

    return(
        <>
        <form onSubmit={handleSubmit}>
            <input type="text" ref={nameRef}/>
            <input type="number" ref={ageRef}/>
            <input type="email" ref={emailRef}/>
            <input type="password" ref={passRef}/>
            <button type="submit">Submit</button>
        </form>
        </>
    )
}

export default Forms;