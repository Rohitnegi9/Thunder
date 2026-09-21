import { useForm } from "react-hook-form"
// zod wala logic kal continue karenge

function Formshook(){
   
    const {register, handleSubmit, formState: { errors }} = useForm();
    
    function submitForm(data){
       console.log(data);
    }

    return(
        <>
        <form onSubmit={handleSubmit(submitForm)}>
            <div>
                <label htmlFor="first">Name</label>
                <input id="first" {...register("name", {
                    required: "Name is Required",
                    minLength: {value:3, message:"Minimum Length should be 3"},
                    maxLength: {value:20, message:"Maximum Length should be 20"}
                })}/>
                {errors.name && <span>{errors.name.message}</span>}
            </div>
            <div>
                <label htmlFor="second">Age</label>
                <input id="second" {...register("age")}/>
            </div>
            <div>
                <label htmlFor="third">Email</label>
                <input id="third" {...register("email")}/>
            </div>
            <div>
                <label htmlFor="fourth">Password</label>
                <input id="fourth" {...register("password")}/>
            </div>
            <button type="submit">Submit</button>
        </form>
        </>
    )
}

export default Formshook;