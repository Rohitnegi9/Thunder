

function Sum({num}){

    return (
        <>
        <h1>My total Sum: {num>=0? (num*(num+1)/2):(-num*(num-1)/2) }</h1>
        </>
    )

}

export default Sum;