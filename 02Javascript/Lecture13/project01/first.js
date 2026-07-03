const button = document.querySelector('button');


button.addEventListener('click',()=>{
    const Boys = document.getElementById('boy');
    const Girls = document.getElementById('girl');

    const value1 = Boys.value.length;
    const value2 = Girls.value.length;

    const result = (value1*value2*value1*value2)%101;

    const h2 = document.querySelector('h2');
    h2.textContent = `Result is: ${result}%`;
})