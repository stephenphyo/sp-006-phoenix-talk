import { createContext, useState, useEffect, useRef } from 'react';

/*** Utility Imports ***/
import socketio from 'utils/socketio';

/*** Context ***/
const OnlineUsersContext = createContext();
export default OnlineUsersContext;

/*** Context Provider ***/
export const OnlineUsersContextProvider = (props) => {

    /* useState */
    const [onlineUsers, setOnlineUsers] = useState([]);

    /* useRef */
    const socketRef = useRef(socketio());

    /* useEffect */
    useEffect(() => {
        socketRef.current.on('onlineUsers', (users) => {
            setOnlineUsers(users);
        });

        return () => {
            socketRef.current.off('onlineUsers');
        }
    }, []);

    /* Context Values */
    const value = {
        onlineUsers, setOnlineUsers
    };

    return (
        <OnlineUsersContext.Provider value={value}>
            {props.children}
        </OnlineUsersContext.Provider>
    );
}