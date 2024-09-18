import React, { useContext } from 'react';

/*** CSS Imports ***/
import './ChatInfoBar.css';

/*** Context Imports ***/
import ChatspaceContext from 'contexts/ChatspaceContext';

/*** Icon Imports ***/
import { FaTrashAlt } from 'react-icons/fa';

function ChatInfoBar() {

    /* useContext */
    const {
        chatInfo,
        infobarWidth, setInfobarWidth,
    } = useContext(ChatspaceContext);

    return (
        <div className={`chat_infobar col-sm-12 col-lg-${infobarWidth}`}>
            <div className='chat_infobar_header'>
                <div id='close' onClick={() => setInfobarWidth(0)}>
                    <div className='close_icon'></div>
                </div>
                <span id='type'>
                    {chatInfo?.type === 'personal'
                        ? 'Contact Info'
                        : chatInfo?.type === 'group' && 'Group Info'}
                </span>
            </div>
            <div className='chat_infobar_profile'>
                <div className='chat_infobar_profile_image'>
                    <img src={chatInfo?.avatar?.url} alt='profile' />
                </div>
                <div className='chat_infobar_profile_contents'>
                    <h3>{chatInfo?.name}</h3>
                    <span>Content</span>
                </div>
            </div>
            <div className='chat_infobar_options'>
                <div className='chat_infobar_option' id='delete'>
                    <span id='icon'><FaTrashAlt size={20} /></span>
                    <span>Delete Chat</span>
                </div>
            </div>
        </div>
    );
}

export default ChatInfoBar;