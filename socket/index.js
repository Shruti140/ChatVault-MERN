import { Server } from 'socket.io';

const io = new Server(9000, {
    cors: {
        origin: 'http://localhost:3000',
    }, 
})

let users = [];

const addUser = (userData, socketId) => {
    !users.some(user => user.sub === userData.sub) && users.push({ ...userData, socketId });
}

const getUser = (userId) => {
    return users.find(user => user.sub === userId);
}

const removeUser = (socketId) => {
    users = users.filter(user => user.socketId !== socketId);
}

io.on('connection',(socket)=>{
    console.log('user connected');

    //connect
    socket.on("addUser", userData => {
        addUser(userData, socket.id);
        io.emit("getUsers", users);
    })

    //send message
    socket.on('sendMessage', data => {
        const user = getUser(data.receiverId);
        socket.to(user?.socketId).emit('getMessage', data);
    })

    //disconnect
    socket.on('disconnect', () => {
        console.log('user disconnected');
        removeUser(socket.id);
        io.emit('getUsers', users);
    })
})