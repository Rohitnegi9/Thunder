const http = require('http');


const server = http.createServer((request,response)=>{
      
    const path = request.url.split('/');
    
    // path = ['' , "add", "10", "20"];
    const operation = path[1];
    const number1 = Number(path[2]);
    const number2 = Number(path[3]);

    if(operation==='add'){
        response.end(JSON.stringify(number1+number2));
    }
    else if(operation=='sub'){
        response.end(JSON.stringify(number1-number2));
    }
    else if(operation=='mul'){
        response.end(JSON.stringify(number1*number2));
    }
    else if(operation=='div'){
        response.end(JSON.stringify(number1/number2));
    }
    else{
        response.end("Invalid Operation");
    }
})


server.listen(3000,()=>{
    console.log("Server is listening at 3000 port");
})