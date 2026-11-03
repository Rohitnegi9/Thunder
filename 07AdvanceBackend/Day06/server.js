import { WebSocketServer } from "ws";

const wss = new WebSocketServer({port: 3000});


wss.on('connection',(ws)=>{
    
    console.log("Client connected", wss.clients.size);
    // client info: phonumber: ws: Map

    // ws.on("message",(data)=>{
    //     // console.log("Client Says: ", data.toString());
    //     const msg = data.toString();
    //     // ws.send("I am best");
    //     wss.clients.forEach((client)=>{
    //         client.send(msg);
    //     })
    // });

    ws.on("message",(data)=>{
        // console.log("Client Says: ", data.toString());
        const msg = JSON.parse(data.toString());
        console.log(msg);
        // ws.send("I am best");
        wss.clients.forEach((client)=>{
            client.send(JSON.stringify(msg));
        })
    });

    ws.on("close",()=>{
        console.log("Client disconnected");
    })
    
})

console.log("Server listening at port 3000");