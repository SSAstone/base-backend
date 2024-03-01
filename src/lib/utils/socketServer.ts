import { Server } from 'socket.io';
import http from 'http'

export default function initializeSocket(server: http.Server) {
    const io = new Server(server, {
        cors: {
            origin: 'http://localhost:3000',
            methods: ['GET', 'POST'],
            credentials: true
        }
    });

    io.on('connection', (socket) => {
        console.log("a user connected:" ,socket.id);
        // socket.emit('test', 'test');

        socket.on('test', (data) => {
            console.log(data)
            io.emit('test-response', data)
        })

        socket.on("disconnect", () => {
            console.log("User Disconnected", socket.id);
        });
    });
}