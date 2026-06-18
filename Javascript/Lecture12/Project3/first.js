const Button1 = document.getElementById("bt1");
const Button2 = document.getElementById("bt2");
const h1 = document.querySelector('h1');

let count = 0;

Button1.addEventListener('click',()=>{
    count++;
    h1.textContent = `Counter is: ${count}`
})

Button2.addEventListener('click',()=>{
    if(count==0)
        return;
    count--;
    h1.textContent = `Counter is: ${count}`
})
