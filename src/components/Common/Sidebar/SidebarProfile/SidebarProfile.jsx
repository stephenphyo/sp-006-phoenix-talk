import React, { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

/*** CSS Imports ***/
import './SidebarProfile.css';

/*** Redux Imports ***/
import { useSelector } from 'react-redux';
import { useLazyLogoutQuery } from 'redux-app/apis/AuthAPI';
import { persistor } from 'redux-app/store';

/*** Context Imports ***/
import OnlineUsersContext from 'contexts/OnlineUsersContext';

/*** Component Imports ***/
import Dropdown from 'components/Common/Dropdown/SPDropdown';
import Avatar from 'components/Main/Avatar/Avatar';

/*** Icon Imports ***/
import { SlOptionsVertical } from 'react-icons/sl';
import { RiChatNewLine } from 'react-icons/ri';

function SidebarProfile() {

    /* Router */
    const navigate = useNavigate();

    /* Redux */
    const { account } = useSelector(state => state.auth);
    const [logout, { isSuccess: isLogoutSuccess }] = useLazyLogoutQuery();

    /* useContext */
    const { onlineUsers } = useContext(OnlineUsersContext);

    /* useEffect */
    useEffect(() => {
        if (isLogoutSuccess) {
            // persistor.purge();
            navigate('/login');
        }
    }, [isLogoutSuccess])

    return (
        <div className='sidebar_profile'>
            <Avatar
                image={account?.avatar?.url}
                userStatus={onlineUsers.includes(account?._id) ? 'online' : 'offline'}
                style={{ '--size': '3rem' }}
            />
            <div className='sidebar_profile_name'>
                <span>
                    {`${account?.firstName} ${account?.lastName}`}
                </span>
            </div>
            <div className='sidebar_profile_options'>
                <div id='option' tooltip='New Chat'>
                    <RiChatNewLine size={22} />
                </div>
                <div id='option' tooltip='Menu'>
                    {
                        <Dropdown>
                            <Dropdown.Title enableArrow={false}>
                                <SlOptionsVertical size={20} />
                            </Dropdown.Title>
                            <Dropdown.Menu align='right'>
                                <Dropdown.Item
                                    onClick={() => console.log('Item 1 Clicked')}>
                                    Item 1
                                </Dropdown.Item>
                                <Dropdown.Item
                                    onClick={() => console.log('Item 2 Clicked')}
                                    clickable={false}>
                                    Item 2
                                </Dropdown.Item>
                                <Dropdown.Item
                                    style={{ 'color': 'red' }}
                                    onClick={() => logout()}>
                                    Logout
                                </Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    }
                </div>
            </div>
        </div>
    );
}

export default SidebarProfile;