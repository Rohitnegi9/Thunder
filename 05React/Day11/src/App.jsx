import Customer from "./Customer"
import Home from "./Home"
import About from "./About"
import Contact from "./Contact"
import { useState } from "react"
import {Routes, Route } from "react-router";
import { NavLink } from "react-router";
import Dsa from "./Dsa";
import Genai from "./Genai"
import Devops from "./Devops";
import Course from "./Course"
import Question from "./Question"
import Page from "./Page"
import Practice from "./Practice"


function App(){


    return(
        <>
        <nav>
            <NavLink to="/">Home</NavLink>
            <NavLink to="/Contact">Contact</NavLink>
            <NavLink to="/About">About</NavLink>
            <NavLink to="/Customer">Customer</NavLink>
            <NavLink to="/practice/12332">3 Sum</NavLink>
            <NavLink to="/practice/32713">LCS</NavLink>
            <NavLink to="/practice/32513">2ACS</NavLink>
        </nav>
        <Routes>
            <Route path="/" element={<Home></Home>}></Route>
            <Route path="/Contact" element={<Contact></Contact>}></Route>
            <Route path="/Customer" element={<Customer></Customer>}></Route>
            <Route path="/About" element={<About></About>}></Route>
            {/* <Route path="/course/devops" element={<Devops></Devops>}></Route>
            <Route path="/course/dsa" element={<Dsa></Dsa>}></Route>
            <Route path="/course/genai" element={<Genai></Genai>}></Route> */}
            <Route path="/course" element={<Course></Course>}>
                <Route index element={<Page></Page>}></Route>
                <Route path="devops" element={<Devops></Devops>}></Route>
                <Route path="dsa" element={<Dsa></Dsa>}></Route>
                <Route path="genai" element={<Genai></Genai>}></Route>
                <Route path="*" element={<h1>Page Not Found</h1>}></Route>
            </Route>
            {/* <Route path="/practice" element={<Practice></Practice>}></Route>
            <Route path="/practice/:id" element={<Question></Question>}></Route> */}

            <Route element={<Course></Course>}>
                <Route path="devops" element={<Devops></Devops>}></Route>
                <Route path="dsa" element={<Dsa></Dsa>}></Route>
                <Route path="genai" element={<Genai></Genai>}></Route>
            </Route>
            
            <Route path="/practice">
                <Route index element={<Practice></Practice>}></Route>
                <Route path=":id" element={<Question></Question>}></Route>
            </Route>

        </Routes>
        </>
    )
}

export default App;