const TextArea = document.getElementById('comment');
const TextCount = document.querySelector('h2');
const WordCount = document.querySelector('h3');

TextArea.addEventListener('input',()=>{
    const text = TextArea.value;
    const totalText = text.trim();

    // totalText = "";
    // [""]

    const arr = totalText.split(" ");
    console.log(arr);
    // ["Rohit","negi","is"]
    TextCount.textContent = `TextCount: ${totalText.length}`
    if(totalText==="")
        WordCount.textContent = `WordCount: 0`
    else
        WordCount.textContent = `WordCount: ${arr.length}`
})

//  case handle 