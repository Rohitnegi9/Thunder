import { WebSocketServer } from "ws";
import {randomUUID} from "node:crypto"


const wss = new WebSocketServer({port:3000});

const rooms = new Map();

wss.on("connection",(ws)=>{

   console.log("Client connected: ", wss.clients.size);
    
    
    ws.on('message',(data)=>{
        
        const message = JSON.parse(data.toString());


        // create room
        if(message.type == "create_room"){
            const roomId = randomUUID();
            
            rooms.set(roomId, new Set([ws]));
            ws.roomId = roomId;
            ws.userName = message.userName;

            ws.send(JSON.stringify({
                type: "room_created",
                roomId
            }));
        }
        else if(message.type == "join_room"){
            const roomId = message.roomId;

            const clients = rooms.get(roomId);

            if(!clients){
                ws.send(JSON.stringify({
                    type: "error",
                    text: "Invalid room ID"
                }))
                return;
            }

            console.log("Hello rooms joiner");

            clients.add(ws);
            ws.roomId = roomId;
            ws.userName = message.userName;

            ws.send(JSON.stringify({
                type: "room_joined",
                roomId
            }));
        }
        // join room
        // chat
        if(message.type == "chat"){
          const roomId = message.roomId;

          const clients = rooms.get(roomId);

          if(!clients){
            ws.send(JSON.stringify({
                    type: "error",
                    text: "Invalid room"
                }))
                return;
          }

          for(const client of clients){
            client.send(JSON.stringify({
                type: "messages",
                text: message.text,
                userName: message.userName
            }));
          }

        }
    })


    ws.on('close',()=>{
        const roomId = ws.roomId;

        const clients = rooms.get(roomId);
        
        if(!clients)
            return;

        clients.delete(ws);

        if(clients.size ==0){
            rooms.delete(roomId);
        }
    })

    
    // connection close
})

console.log("Websocket server started at port 3000");