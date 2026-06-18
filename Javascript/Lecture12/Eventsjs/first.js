// 4 event Listener

// const child1 = document.getElementById('child1');
// const child2 = document.getElementById('child2');
// const child3 = document.getElementById('child3');
// const child4 = document.getElementById('child4');

// const parent = document.getElementById("parent");
// parent.addEventListener('click',(e)=>{
//     console.log(e);
//     e.target.textContent = "I am clicked";
// })


// child1.addEventListener('click',()=>{
//     child1.textContent = "I am clicked";
// })

// child2.addEventListener('click',()=>{
//     child2.textContent = "I am clicked";
// })

// child3.addEventListener('click',()=>{
//     child3.textContent = "I am clicked";
// })

// child4.addEventListener('click',()=>{
//     child4.textContent = "I am clicked";
// })


// 3 event listened

// const grandParent = document.getElementById('grandParent')
// const parent = document.getElementById('Parent')
// const child = document.getElementById('child')


// grandParent.addEventListener('click',()=>{
//     console.log("Grand parent is clicked")
// },true)

// parent.addEventListener('click',()=>{
//     console.log("parent is clicked")
// },false)


// child.addEventListener('click',()=>{
//     console.log("Child is clicked")
// },true)

// Event bubbling

// capture phase


const button = document.querySelector('button');

function handle(){
    button.textContent = "Clicked";
    button.removeEventListener('click',handle);
}



button.addEventListener('click',handle);






// event listener remover