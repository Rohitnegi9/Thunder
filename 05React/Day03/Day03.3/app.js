
let count = 0;

const heading = document.createElement('h1');
heading.textContent = `Counter: ${count}`;

const button = document.createElement("button");
button.textContent = "Increment";

const root = document.getElementById('root');
root.append(heading,button);


button.addEventListener('click',()=>{
    count++;
    heading.textContent = `Counter: ${count}`;
    console.log(count);
})