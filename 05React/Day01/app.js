
// <h1>Hello Coder Army </h1>
// const element = document.createElement('h1');
// element.textContent = "Hello Coder Army";
// element.id = "first";
// element.className = "second";
// element.style.backgroundColor = "pink";
// element.style.fontSize = "100px";
// element.style.color = 'brown'



// style: {backgroundColor: "pink", fontSize: "100px", color: "brown"}

// const element2 = document.createElement('h2');
// element2.textContent = "Sab changa si hai";
// element2.id = "third";
// element2.className = "second";
// element2.style.backgroundColor = "purple";
// element2.style.fontSize = "70px";
// element2.style.color = 'green'

// attributes = {id:"first", className: "second", style: {backgroundColor: "pink", fontSize: "100px", color: "brown"}}

// element = {id:"first", className:"second",style:{backgroundColor: "pink", fontSize: "100px", color: "brown"} }




// const React = {
//     createElement: function(tag, attributes,children){

//         const element = document.createElement(tag);
//         element.textContent = children;

//             for(const key in attributes){
//                 if(key=="style"){
//                     Object.assign(element.style,attributes.style);
//                 }
//                 else
//                 element[key] = attributes[key];
//             }
//         return element;
//     }
// }


// const ReactDOM = {
//     render : function(child,parent){
//         parent.append(child);
//     }
// }



// const React = {
//     createElement: function(tag,attributes,children){
//         return {
//             type: tag,
//             props: {
//                 ...attributes,
//                 children
//             }
//         }
//     }
// }

// const ReactDOM = {
//     render: function(reactElement,parent){
//         const element = document.createElement(reactElement.type);

//         for(const key in reactElement.props){
//             if(key=="style"){
//                 Object.assign(element.style,reactElement.props.style)
//             }
//             else if(key=="children"){
//                 element.textContent = reactElement.props.children
//             }
//             else{
//                 element[key] = reactElement.props[key];
//             }
//         }
//         parent.innerHTML = "";
//         parent.append(element);
//     }
// }


// const element = React.createElement('h1',{id:"first", className: "second", style: {backgroundColor: "pink", fontSize: "100px", color: "brown"}} ,"Hello Coder Army");
// const element2 = React.createElement('h2',{id:"third", className: "second", style: {backgroundColor: "brown", fontSize: "70px", color: "green"}} ,"Sab Changa si hai");

// const div = React.createElement('div',null,element,element2);

// const element = <h1>Hello Coder Army</h1>;


{/* <div>
    <h1>Hello Coder Army</h1>
    <h2>Sab Changa si hai</h2>
</div> */}
// const element3 = document.createElement("h1");
// console.log(element);
// console.dir(element3);

const root = document.getElementById("root");
ReactDOM.render(div,root);






