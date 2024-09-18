import { io } from 'socket.io-client';

let socket;

const socketio = (options) => {
    if (!socket) {
        socket = io(process.env.REACT_APP_API_URL, options);
    }
    return socket;
}

export default socketio;