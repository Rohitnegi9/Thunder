let count = 0;

function render(){
   
    document.getElementById('root').innerHTML = `
    <h1>THis is your Raw application</h1>
    <h1>Counter is: ${count}</h1>
    <button onClick="increment()">Increment</button>
    <button onClick="decrement()">Decrement</button>
    `
}

function increment(){
    count=0;
    // doc
    render();
}

function decrement(){
    count--;
    render();
}


render();




