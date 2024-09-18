import React, { useState, useEffect, useRef, useContext } from 'react';

/*** CSS Imports ***/
import './SidebarChat.css';

/*** Redux Imports ***/
import { useDispatch, useSelector } from 'react-redux';
import { selectChat } from 'redux-app/slices/ChatSlice';
import Avatar from 'components/Main/Avatar/Avatar';

/*** Context Imports ***/
import OnlineUsersContext from 'contexts/OnlineUsersContext';

/*** Utility Imports ***/
import socketio from 'utils/socketio';

/*** Package Imports ***/
import moment from 'moment';

function SidebarChat({ data: chat }) {

    /** Redux **/
    const { account } = useSelector(state => state.auth);
    const { selectedChatId } = useSelector(state => state.chat);
    const dispatch = useDispatch();

    /** useContext **/
    const { onlineUsers } = useContext(OnlineUsersContext);

    /** useState **/
    const [lastMessage, setLastMessage] = useState({});

    /** useRef **/
    const socketRef = useRef(socketio());
    const chatUserRef = useRef({});

    /**  useEffect **/
    useEffect(() => {
        chatUserRef.current = chat?.members.find(member => member._id !== account?._id);
    }, [chat, account]);

    /* Receive Message Socket */
    useEffect(() => {
        const localSocketRef = socketRef.current;
        if (localSocketRef) {
            localSocketRef.on('receive_message', (incomingMessage) => {
                if (chat?._id === incomingMessage?.chat) {
                    setLastMessage(incomingMessage);
                }
            });
        }

        return () => {
            if (localSocketRef) {
                localSocketRef.off('receive_message');
            }
        }
    }, [selectedChatId, chat]);

    return (
        <div
            className={`sidebar_chat ${chat?._id === selectedChatId ? 'active' : ''}`}
            onClick={() => dispatch(selectChat(chat?._id))}>
            <Avatar
                image={chatUserRef.current?.avatar?.url}
                userStatus={onlineUsers.includes(chatUserRef.current?._id) ? 'online' : 'offline'}
                style={{ '--size': '2.5rem' }} />
            <div className='sidebar_chat_contents'>
                <span className='sidebar_chat_name'>
                    {`${chatUserRef.current?.firstName} ${chatUserRef.current?.lastName}`}
                </span>
                <span className='sidebar_chat_message'>
                    {
                        account?._id === lastMessage?.sender
                            ? 'You: '
                            : ''
                    }
                    {
                        lastMessage?.type === 'text'
                            ? lastMessage?.content?.text
                            : lastMessage?.type === 'image'
                                ? 'Image'
                                : ''
                    }
                    {
                        lastMessage?.createdAt
                            ? ` - ${moment(lastMessage?.createdAt).startOf('mini').fromNow()}`
                            : ''
                    }
                    <span id='seen_user'>
                        <img src={account?.avatar?.url} alt='avatar' />
                    </span>
                </span>
            </div>
            <div className='sidebar_chat_metadata'>
                <span>10</span>
            </div>
        </div>
    );
}

export default SidebarChat;