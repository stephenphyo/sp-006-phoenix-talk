import React, { useState, useEffect } from 'react';

/*** CSS Imports ***/
import './SidebarHeader.css';

/*** Component Imports ***/
import SearchInput from 'components/Common/SearchInput/SearchInput';

function SidebarHeader() {

    const [text, setText] = useState('');

    useEffect(() => {
        console.log(text);
    }, [text]);

    return (
        <div className='sidebar_header'>
            <SearchInput text={text} setText={setText} />
        </div >
    );
}

export default SidebarHeader;