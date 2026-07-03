const form = document.querySelector('form');
const first = document.getElementById('first');
const second = document.getElementById('second');
const p = document.querySelector('p');


form.addEventListener('submit',(e)=>{
   e.preventDefault(); 
   const number1 = Number(first.value);
   const number2 = Number(second.value);

  p.textContent = `Result is: ${number1+number2}`;
})
