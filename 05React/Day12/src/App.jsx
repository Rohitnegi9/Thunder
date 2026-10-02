import { useState } from "react";
import { createContext } from "react";
// import { hell } from "./store";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Body from "./components/Body";


// export const Countcontext = createContext(); 
// export const Setcountcontext = createContext(); 
// export const Usercontext = createContext(); 
// export const Setusercontext = createContext(); 



// function App(){
   
//   const [count, setCount] = useState(0);
//   const [user,setUser] = useState("Rohit");


//   return(
//     <>
//      <Countcontext value={count}>
//       <Setcountcontext value={setCount}>
//         <Usercontext value={user}>
//           <Setusercontext value={setUser}>
//               <h1>Hello Coder Army: {hell}</h1>
//               <Header></Header>
//           </Setusercontext>
//         </Usercontext>
//       </Setcountcontext>
//      </Countcontext>
//      {/* <Countcontext value={count}><Headers></Headers></Countcontext>
//      <Setcountcontext value={setCount}><Headers></Headers></Setcountcontext> */}
//     </>
//   )

// }


// function App(){


//   return(
//     <>
//     <h1>Hello ji: {hell}</h1>
//     </>
//   )
// }



function App(){
    


  return(
    <>
      <h1>Welcome to Coder Army</h1>
      <Header></Header>
      <Body></Body>
      <Footer></Footer>
    </>
  )


}


export default App;