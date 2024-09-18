import { createContext, useState } from 'react';

/*** Context ***/
const ChatspaceContext = createContext();
export default ChatspaceContext;

/*** Context Provider ***/
export const ChatspaceContextProvider = (props) => {

    /* useState */
    const [chat, setChat] = useState({});
    const [message, setMessage] = useState('');
    const [chatInfo, setChatInfo] = useState({
        id: null,
        type: null,
        name: null,
        avatar: null,
        members: null
    });
    const [infobarWidth, setInfobarWidth] = useState(0);

    /* Context Values */
    const value = {
        chat, setChat,
        message, setMessage,
        chatInfo, setChatInfo,
        infobarWidth, setInfobarWidth,
    };

    return (
        <ChatspaceContext.Provider value={value}>
            {props.children}
        </ChatspaceContext.Provider>
    );
}