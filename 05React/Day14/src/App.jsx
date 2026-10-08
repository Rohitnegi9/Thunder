import { Route, Routes } from "react-router";
import Home from "./pages/Home"
import Login from "./pages/Login"
import Signup from "./pages/Signup"

function App(){
  return(
    <Routes>
      <Route path="/" element={<Home></Home>}></Route>
      <Route path="/signup" element={<Signup></Signup>}></Route>
      <Route path="/login" element={<Login></Login>}></Route>
    </Routes>
  )
}

export default App;