import React, { useState, useEffect, useRef, useContext, useMemo } from 'react';

/*** CSS Imports ***/
import './Chatspace.css';

/*** Component Imports ***/
import NoChat from './NoChat/NoChat';
import ChatHeader from './ChatHeader/ChatHeader';
import ChatFooter from './ChatFooter/ChatFooter';
import ChatInfoBar from './ChatInfo/ChatInfoBar';
import ChatMessage from 'components/Main/ChatMessage/ChatMessage';
import ContextMenu from 'components/Common/ContextMenu/ContextMenu';

/*** Redux Imports ***/
import { useSelector, useDispatch } from 'react-redux';
import { addChatMessage } from 'redux-app/slices/ChatSlice';
import { useLazyGetChatQuery, useLazyGetChatMessagesQuery } from 'redux-app/apis/ChatAPI';

/*** Context Imports ***/
import ChatspaceContext from 'contexts/ChatspaceContext';

/*** Utility Imports ***/
import socketio from 'utils/socketio';
import groupMessagesByDate from 'utils/groupMessagesbyDate';

/*** Asset Imports ***/
import notification from 'assets/sound/notification.mp3';

function Chatspace() {

    const notificationSound = new Audio(notification);

    /* useState */
    const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });
    const [isMenuVisible, setIsMenuVisible] = useState(false);
    const [typingMessage, setTypingMessage] = useState(false);
    const [typingUsers, setTypingUsers] = useState([]);

    /* useRef */
    const socketRef = useRef(socketio());
    const bottomRef = useRef(null);
    const menuRef = useRef(null);

    /* Redux */
    const { account } = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const { selectedChatId, chatMessages } = useSelector(state => state.chat);
    const [getChat, resultChat] = useLazyGetChatQuery();
    const [getChatMessages, resultChatMessages] = useLazyGetChatMessagesQuery();

    /* useContext */
    const {
        chat, setChat,
        infobarWidth,
        setChatInfo
    } = useContext(ChatspaceContext);

    const handleContextMenu = (e, id) => {
        e.preventDefault();
        setMenuPosition({ x: e.pageX, y: e.pageY });
        setIsMenuVisible(true);
        console.log(id);
    }

    /* useMemo */
    const groupedMessages = useMemo(
        () => groupMessagesByDate(chatMessages),
        [chatMessages]
    );

    /* useEffect */
    useEffect(() => {
        if (selectedChatId) {
            getChat(selectedChatId);
            getChatMessages(selectedChatId);
        };
    }, [selectedChatId, getChat, getChatMessages]);

    useEffect(() => {
        console.log(chat);
    }, [chat]);

    useEffect(() => {
        if (chat?.chatType === 'private') {
            const chatUser = chat?.members?.find(
                member => member._id !== account?._id
            );

            setChatInfo({
                id: chatUser?._id,
                type: 'private',
                name: `${chatUser?.firstName} ${chatUser?.lastName}`,
                avatar: chatUser?.avatar
            });
        }
    }, [chat, account, setChatInfo]);

    useEffect(() => {
        if (resultChat.data) {
            setChat(resultChat.data);
        }
    }, [resultChat.data, setChat]);

    /* Receive Message Socket */
    useEffect(() => {
        const localSocketRef = socketRef.current;
        if (localSocketRef) {
            localSocketRef.on('receive_message', (message) => {
                if (message?.chat === selectedChatId) {
                    dispatch(addChatMessage(message));
                    if (message?.sender !== account._id) {
                        notificationSound.play().catch((error) => {
                            console.error('Error playing the audio:', error);
                        });
                    }
                }
            });
        }

        return () => {
            if (localSocketRef) {
                localSocketRef.off('receive_message');
            }
        }
    }, [selectedChatId]);

    /* User Typing Notification Socket */
    useEffect(() => {
        const localSocketRef = socketRef.current;
        if (localSocketRef) {
            localSocketRef.on('get_start_typing', (message) => {
                if (message?.chat === selectedChatId) {
                    if (!typingUsers.includes(message?.userId)) {
                        /*
                        Cannot directly spread the existing typingUsers array
                        into a new one as React batches statet updates and
                        typingUsers in current closure might not be the latest value
                        */
                        setTypingUsers(prev => {
                            if (!prev.includes(message?.userId)) {
                                return ([...prev, message?.userId]);
                            }
                            return prev;
                        });
                    }
                }
            });
        }

        return () => {
            if (localSocketRef) {
                localSocketRef.off('get_start_typing');
            }
        }
    }, [typingUsers, selectedChatId]);

    useEffect(() => {
        const localSocketRef = socketRef.current;
        if (localSocketRef) {
            localSocketRef.on('get_stop_typing', (message) => {
                if (message?.chat === selectedChatId) {
                    if (typingUsers.includes(message?.userId)) {
                        /*
                        Cannot directly use filter in the existing array and
                        set into a new one as React batches statet updates and
                        typingUsers in current closure might not be the latest value
                        */
                        setTypingUsers(prev => prev.filter(user => {
                            return user !== message?.userId
                        }));
                    }
                }
            });
        }

        return () => {
            if (localSocketRef) {
                localSocketRef.off('get_stop_typing');
            }
        }
    }, [typingUsers, selectedChatId]);

    useEffect(() => {
        if (typingUsers.length !== 0) {
            setTypingMessage(true);
        }
        else {
            setTypingMessage(false);
        }
    }, [typingUsers]);

    useEffect(() => {
        if (bottomRef.current) {
            bottomRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [groupedMessages]);

    return (
        <div className='chatspace'>
            <div className={`chatspace_main col-sm-12 col-lg-${12 - infobarWidth}`}>
                {
                    !selectedChatId
                        ? <NoChat />
                        :
                        <>
                            <ChatHeader />

                            <div className='chatspace_body'>
                                {
                                    !resultChat?.isLoading && Object.keys(groupedMessages)?.length > 0 &&
                                    Object.keys(groupedMessages).map((date, idx) => (
                                        <div key={idx} className='chatspace_body_daily'>
                                            <span className='chatspace_body_date'>{date}</span>
                                            {
                                                groupedMessages[date]?.map((message, idx, messages) => (
                                                    <ChatMessage
                                                        key={idx}
                                                        data={{
                                                            ...message,
                                                            sender: chat?.members?.find(
                                                                member => member._id === message?.sender
                                                            ),
                                                            type: 'text'
                                                        }}
                                                        isUserMessage={account?._id !== message?.sender}
                                                        isSameSender={idx < messages.length - 1 && message?.sender === messages[idx + 1]?.sender}
                                                        onContextMenu={(e) => handleContextMenu(e, message?._id)}
                                                    />
                                                ))
                                            }
                                        </div>
                                    ))
                                }
                                <div className='chatspace_body_typing'>
                                    {typingMessage &&
                                        <span>
                                            {
                                                typingUsers.map((userId) => {
                                                    const user = chat?.members?.find((user) => {
                                                        return user._id === userId;
                                                    });
                                                    return `${user?.firstName} ${user?.lastName}`;
                                                })
                                            }
                                            <span> is typing ...</span>
                                        </span>
                                    }
                                </div>
                                {/* <ChatMessage
                                    data={{
                                        images: [
                                            'https://i.pinimg.com/originals/7e/4c/94/7e4c94d253b03c5ec3e84e173e872dcc.jpg',
                                            'https://i.pinimg.com/originals/7e/4c/94/7e4c94d253b03c5ec3e84e173e872dcc.jpg',
                                            'https://i.pinimg.com/originals/7e/4c/94/7e4c94d253b03c5ec3e84e173e872dcc.jpg',
                                            'https://i.pinimg.com/originals/7e/4c/94/7e4c94d253b03c5ec3e84e173e872dcc.jpg',
                                            'https://i.pinimg.com/originals/7e/4c/94/7e4c94d253b03c5ec3e84e173e872dcc.jpg',
                                            'https://i.pinimg.com/originals/7e/4c/94/7e4c94d253b03c5ec3e84e173e872dcc.jpg',
                                            'https://i.pinimg.com/originals/7e/4c/94/7e4c94d253b03c5ec3e84e173e872dcc.jpg',
                                            'https://i.pinimg.com/originals/7e/4c/94/7e4c94d253b03c5ec3e84e173e872dcc.jpg',
                                            'https://i.pinimg.com/originals/7e/4c/94/7e4c94d253b03c5ec3e84e173e872dcc.jpg',
                                            'https://i.pinimg.com/originals/7e/4c/94/7e4c94d253b03c5ec3e84e173e872dcc.jpg',
                                            'https://i.pinimg.com/originals/7e/4c/94/7e4c94d253b03c5ec3e84e173e872dcc.jpg',
                                            'https://i.pinimg.com/originals/7e/4c/94/7e4c94d253b03c5ec3e84e173e872dcc.jpg',
                                            'https://i.pinimg.com/originals/7e/4c/94/7e4c94d253b03c5ec3e84e173e872dcc.jpg',
                                            'https://i.pinimg.com/originals/7e/4c/94/7e4c94d253b03c5ec3e84e173e872dcc.jpg',
                                        ],
                                        text: 'Hello',
                                        type: 'image'
                                    }}
                                    isUserMessage={true}
                                    isSameSender={true}
                                /> */}
                                <span ref={bottomRef}></span>
                            </div>

                            <ChatFooter />

                            {/* Context Menu */}
                            <ContextMenu ref={menuRef}
                                x={menuPosition.x} y={menuPosition.y}
                                isVisible={isMenuVisible} setIsVisible={setIsMenuVisible}
                            >
                                <ContextMenu.Option>Option 1</ContextMenu.Option>
                                <ContextMenu.Option>Option 2</ContextMenu.Option>
                                <ContextMenu.Option>Option 3</ContextMenu.Option>
                            </ContextMenu>
                        </>
                }
            </div>
            <ChatInfoBar />
        </div >
    );
}

export default Chatspace;