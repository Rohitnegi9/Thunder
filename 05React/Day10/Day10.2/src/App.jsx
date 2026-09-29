import Customer from "./Customer"
import Home from "./Home"
import About from "./About"
import Contact from "./Contact"
import { useState } from "react"
import {Routes, Route } from "react-router";
import { NavLink } from "react-router";


// function App(){

//    const [page, setPage] = useState("Home");

//   return(
//     <>
//     <button onClick={()=>setPage("Home")} >Home</button>
//     <button onClick={()=>setPage("About")}>About</button>
//     <button onClick={()=>setPage("Contact")}>Contact</button>
//     <button onClick={()=>setPage("Customer")}>Customer</button>
//     {
//       page=="Home"&&<Home></Home>
//     }
//     {
//       page=="About"&&<About></About>
//     }
//     {
//       page=="Contact"&&<Contact></Contact>
//     }
//     {
//       page=="Customer"&&<Customer></Customer>
//     }
//     </>
//   )
// }





// function App(){
   
//   const path = window.location.pathname;

//   if(path=="/")
//     return <Home></Home>
  
//   if(path=="/Contact")
//     return <Contact></Contact>

//   if(path=="/About")
//     return <About></About>


//   if(path=="/Customer")
//     return <Customer></Customer>

// }




// function App(){

//    const path = window.location.pathname;

//   return(
//     <>
//     <a href="/">Home</a>
//     <a href="/About">About</a>
//     <a href="/Contact">Contact</a>
//     <a href="/Customer">Customer</a>
//     {path=="/"&&<Home></Home>}
//     {path=="/About"&&<About></About>}
//     {path=="/Customer"&&<Customer></Customer>}
//     {path=="/Contact"&&<Contact></Contact>}
//     </>
//   )
// }





// function App(){
   
//   const [path,setPath] = useState(window.location.pathname);
//   const [count,setCount] = useState(0);
  
  
//   function goToHome(){
//     window.history.pushState({},"","/");
//     setPath("/");
//   }

//   function goToContact(){
//     window.history.pushState({},"","/Contact");
//     setPath("/Contact")
//   }

//   function goToAbout(){
//     window.history.pushState({},"","/About");
//     setPath("/About")
//   }

//   function goToCustomer(){
//     window.history.pushState({},"","/Customer");
//     setPath("/Customer")
//   }

//   return(
//     <>
//     <button onClick={goToHome}>Home</button>
//     <button onClick={goToAbout}>About</button>
//     <button onClick={goToCustomer}>Customer</button>
//     <button onClick={goToContact}>Contact</button>
//     {path=="/"&&<Home count={count} setCount={setCount}></Home>}
//     {path=="/About"&&<About></About>}
//     {path=="/Customer"&&<Customer></Customer>}
//     {path=="/Contact"&&<Contact></Contact>}
//     </>
//   )
// }




function App(){


    return(
        <>
        <nav>
            <NavLink to="/">Home</NavLink>
            <NavLink to="/Contact">Contact</NavLink>
            <NavLink to="/About">About</NavLink>
            <NavLink to="/Customer">Customer</NavLink>
        </nav>
        <Routes>
            <Route path="/" element={<Home></Home>}></Route>
            <Route path="/Contact" element={<Contact></Contact>}></Route>
            <Route path="/Customer" element={<Customer></Customer>}></Route>
            <Route path="/About" element={<About></About>}></Route>
        </Routes>
        </>
    )
}

export default App;