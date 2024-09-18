import React, { useEffect } from 'react';

/*** CSS Imports ***/
import './Sidebar.css';

/*** Component Imports ***/
import SidebarProfile from './SidebarProfile/SidebarProfile';
import SidebarHeader from './SidebarHeader/SidebarHeader';
import SidebarChat from './SidebarChat/SidebarChat';

/*** Redux Imports ***/
import { useSelector } from 'react-redux';
import { useLazyGetUserChatsQuery } from 'redux-app/apis/ChatAPI';

function Sidebar() {

    /* Redux */
    const { chats } = useSelector(state => state.chat);
    const [getUserChats, { data }] = useLazyGetUserChatsQuery();

    /* useEffect */
    useEffect(() => {
        getUserChats();
    }, [data]);

    return (
        <div className='sidebar'>
            <SidebarProfile />
            <SidebarHeader />
            <div className='sidebar_chat_wrapper'>
                {
                    chats?.map((chat, index) => (
                        <SidebarChat key={index} data={chat} />
                    ))
                }
            </div>
            <div className='sidebar_footer'>
                Logout
            </div>

            <div className={`sidebar_sliding`}>
                Sliding Div
            </div>
        </div>
    );
}

export default Sidebar;