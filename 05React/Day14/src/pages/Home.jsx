import { useEffect, useState } from "react";
import { Navigate } from "react-router";
import api from "../api.js"


function Home(){
    const [user,setUser] = useState(null);
    const [status, setStatus] = useState("loading");

    useEffect(()=>{

        async function checksession() {
            try{
                const response = await api.get("/user/profile");
                setUser(response.data);
                setStatus("logged-in");
            }
            catch(error){
                if (error.response?.status === 401) {
                    setStatus("logged-out");
                }
                else{
                    setStatus("error");
                }
            }
        }

        checksession();
    },[]);
    
    
    if(status=="loading")
    {
        return <p className="p-8">Checking Your Session...</p>
    }

    if(status==="logged-out"){
        return <Navigate to="/signup" replace></Navigate>
    }

    if (status === "error") {
    return <p className="p-8">Could not check your session. Please refresh.</p>;
   }

   return(
    <main className="p-8">
        <h1 className="text-3xl font-bold">Welcome to Chat App</h1>
        <p className="mt-3">Hello, {user.name}!</p>
    </main>
   )
}

export default Home;