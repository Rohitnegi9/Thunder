import { useParams } from "react-router";


function Question(){
    
    const {id} = useParams();

    return (
        <>
        <h1>This is my Problem</h1>
        <h2>Problem id is: {id}</h2>
        </>
    )

}
export default Question;