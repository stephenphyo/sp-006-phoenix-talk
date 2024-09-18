import React from 'react';

/*** Redux Imports ***/
import { useSelector } from 'react-redux';

/*** Icon Imports ***/
import { TiMessages } from 'react-icons/ti';

function NoChat() {

    /* Redux */
    const { account } = useSelector(state => state.auth);

    return (
        <div className='chatspace_empty'>
            <p>Welcome {`${account?.firstName} ${account?.lastName}`}</p>
            <p>Select a chat to start messaging</p>
            <TiMessages size={45} />
        </div>
    );
}

export default NoChat;