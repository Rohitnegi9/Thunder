
function Header(){
    
    return (
        <>
        <h1>Welcome to Strike Platform</h1>
        <h2>Here we sell courses</h2>
        </>
    )
}

function Main(){

    return (
        <>
        <p>Here we are going to talk about strike what course we offer</p>
        <ul>
            <li>Web Devlopment</li>
            <li>DSA</li>
            <li>GenAI</li>
            <li>Deep Learning</li>
            <li>Devops</li>
        </ul>
        </>
    )
}


function Footer(){

    return (
        <>
            <h3>I am footer of Strike</h3>
        </>
    )
}


function App(){

    return (
        <>
        <Header/>
        <Main/>
        <Footer/>
        </>
    )
}


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App/>);
