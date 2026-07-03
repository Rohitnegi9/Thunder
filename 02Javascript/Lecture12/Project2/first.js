const parent = document.getElementById('root');
const body = document.querySelector('body');

const color =  ["red","blue","orange","green","pink"]

parent.addEventListener('dblclick',(e)=>{
//     console.log(e.target.id);
//    body.style.backgroundColor = e.target.id;

    const index =  e.target.id;
    body.style.backgroundColor = color[index];
})