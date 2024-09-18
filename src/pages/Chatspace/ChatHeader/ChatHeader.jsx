import React, { useContext } from 'react';

/*** CSS Imports ***/
import './ChatHeader.css';

/*** Component Imports ***/
import Avatar from 'components/Main/Avatar/Avatar';

/*** Context Imports ***/
import ChatspaceContext from 'contexts/ChatspaceContext';
import OnlineUsersContext from 'contexts/OnlineUsersContext';

function ChatHeader() {

    /* useContext */
    const { chatInfo, infobarWidth, setInfobarWidth } = useContext(ChatspaceContext);
    const { onlineUsers } = useContext(OnlineUsersContext);

    return (
        <div className='chat_header'>
            <div className='chat_header_info'
                onClick={() => setInfobarWidth(infobarWidth === 0 ? 4 : 0)}>
                <Avatar
                    image={chatInfo?.avatar?.url}
                    userStatus={onlineUsers.includes(chatInfo?.id) ? 'online' : 'offline'}
                    style={{ '--size': '3rem' }}
                />
                <div className='chat_header_contents'>
                    <span id='chatname'>
                        {chatInfo?.name}
                    </span>
                </div>
            </div>
        </div>
    );
}

export default ChatHeader;