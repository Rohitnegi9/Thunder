import Header from "./components/Header"
import Counter from "./components/Counter"
import { useState, createContext } from "react";

export const CountContext = createContext();

function App(){
  
  const [count, setCount] = useState(0);

  return(
    <>
      <CountContext value={{count,setCount}}>
        <h1>I am the app</h1>
        <Header></Header>
        <Counter></Counter>
      </CountContext>
    </>
  )


}

export default App;