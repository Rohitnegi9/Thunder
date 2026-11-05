import { Server } from "socket.io";

const io = new Server(3000, {
    cors: {
        origin: "*"
    }
});

io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    // Join a room
    socket.on("joinRoom", ({ roomId, username }) => {
        if (!roomId || !username) return;

        // Leave previous room, if any
        if (socket.data.roomId) {
            socket.leave(socket.data.roomId);
        }

        socket.join(roomId);

        socket.data.roomId = roomId;
        socket.data.username = username;

        socket.emit("joinedRoom", roomId);
    });

    // Send message to room
    socket.on("sendMessage", (message) => {
        const roomId = socket.data.roomId;

        if (!roomId || !message?.trim()) return;

        io.to(roomId).emit("newMessage", {
            username: socket.data.username,
            text: message
        });
    });
});
