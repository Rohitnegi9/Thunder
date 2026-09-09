
// React.createElement(tags,props, [child1,child2])

// JSX --> React.createElement
//babel
// const element = <h1>Hello Coder Army</h1>;
// const element2 = <div>I am the best</div>;


// const element3 = <>
//     <h1>Hello Coder Army</h1>
//     <div>I am the best</div>
// </>
    


// React component: function
// nnumber, string, array: Inko display kar deta hai
// true, false, null, ismein error nahi dega, leking kuch display nahi karayega
// object: Error de dega
// function App(){
//    // code likh do
//    const isLoggedIn = false;
//     return <h1>Hello Coder Army {isLoggedIn? <h2>Log Out</h2> : <h2>Log in</h2> }</h1>;
// }


function Hello(props){


    return <>
    <h1>I am best</h1>
    <h2>Aur bhai kaise ho</h2>
    <h3>Hello {props.name} and your age is {props.age}</h3>
    <h4>{props.children}</h4>
    </>
}

// const element = <Hello/>;
// const element2 = <h1>Helo ji</h1>

// const element = Hello({name:"Rohit",age:20});
const element = <Hello name="Rohit" age={20}>Sawad aagya</Hello>;
console.log(element);
// Hello()

// <h1 id="first" className="second" style={}> </h1>
// name: "Rohit" , age: 20
// props


// const root = document.getElementById("root");
// ReactDOM.render(element,root);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(element);
