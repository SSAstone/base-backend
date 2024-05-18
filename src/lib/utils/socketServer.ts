import { Server } from 'socket.io';
import http from 'http';
import Message from '../../api/chart/models/message_schema';

export default function initializeSocket(server: http.Server) {
    const io = new Server(server, {
        cors: {
            origin: ['http://localhost:3000', 'https://e-commerce-three-green.vercel.app', 'http://192.168.0.105:3000', '*'],
            allowedHeaders: '*',
            methods: ['GET', 'POST'],
            credentials: true
        }
    });

    io.on('connection', (socket) => {
        console.log('New client connected');

        socket.on('disconnect', () => {
            console.log('Client disconnected');
        });

        socket.on('sendMessage', async (message) => {
            console.log("🚀 ~ socket.on ~ message:", message);
            try {
                const newMessage = new Message(message);
                await newMessage.save();
                io.to(message?.group).emit('message', newMessage);
            } catch (err) {
                console.error(err);
            }
        });

        socket.on('joinGroup', (group) => {
            console.log("🚀 ~ socket.on ~ group:", group);
            socket.join(group)
        });

        // socket.on('leaveGroup', (group) => {
        //     console.log("🚀 ~ socket.on ~ leaveGroup:", group);
        //     socket.leave(group);
        // });
    });
}
