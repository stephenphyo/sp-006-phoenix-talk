import React, { forwardRef, useState, useRef, useEffect } from 'react';

/*** CSS Imports ***/
import './SearchInput.css';

const SearchInput = forwardRef((props, ref) => {

    /* useState */
    const { text = '', setText = () => { }, ...otherProps } = props;
    const [isFocus, setIsFocus] = useState(false);

    /* useRef */
    const searchRef = useRef(null);

    /* useEffect */
    if (typeof props?.text === 'undefined' || typeof props?.setText === 'undefined') {
        throw new Error("The 'text' and 'setText' props are required in the SearchInput component.");
    }

    return (
        <div className='search' ref={searchRef}
            onFocus={() => setIsFocus(true)}
            onBlur={(e) => {
                if (searchRef.current && searchRef.current.contains(e.target)) {
                    return;
                }
                setIsFocus(false);
            }}>
            <div className='search_icon'></div>
            <input type='text' placeholder='Search' value={text}
                onChange={(e) => setText(e.target.value)}
                {...otherProps} />
            <div className='cancel_icon'
                style={{ display: `${isFocus && text?.length > 0 ? 'block' : 'none'}` }}
                onClick={() => setText('')}></div>
        </div>
    );
});

export default SearchInput;