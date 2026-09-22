import Header from "./Header"
import Body from "./Body"
import Footer from "./Footer"
import { useState } from "react"
import { createContext } from "react"


export const CreateCartContext = createContext();

function App(){
  
  const [totalItem, setTotalItem] = useState(0);
  const [price, setTotalPrice] = useState(0);

  return(
    <>
    <CreateCartContext value={{totalItem,setTotalItem,price,setTotalPrice}}>
      <Header></Header>
      <Body></Body>
      <Footer></Footer>
    </CreateCartContext>
    </>
  )
}

export default App;