import { Server } from "socket.io";

const io = new Server(3000, {
    cors:{
        origin: "*"
    }
});


io.on('connection',(socket)=>{
    console.log("Client: ", socket.id);

    socket.on("message", (data)=>{
        console.log(data);
        socket.emit("reply", "Mein badiya server hu");
    })

    // socket.on("join_room", (data)=>{
        
    // })

});

console.log("Socket server started at port 3000");