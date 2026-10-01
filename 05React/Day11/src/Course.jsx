import { Outlet } from "react-router";

function Course(){
    return(
        <>
        <h1>Welcome to header of my Course</h1>
        <Outlet></Outlet>
        <h2>I am the footer of Course</h2>
        </>
    )
}

export default Course;