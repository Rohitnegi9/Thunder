import {useStore} from "../store"


function Header(){
    
    const userName = useStore((state)=>state.user);
    const setUser = useStore((state)=>state.setUser);

    return(
        <>
        <h2>I am the header</h2>
        <h3>Display the username: {userName}</h3>
        <button onClick={setUser}>ChangeName</button>
        </>
    )
}

export default Header;