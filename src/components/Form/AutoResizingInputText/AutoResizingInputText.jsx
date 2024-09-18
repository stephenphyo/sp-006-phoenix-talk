import React, { forwardRef, useEffect, useRef } from 'react';

/*** CSS Imports ***/
import './AutoResizingInputText.css';

const AutoResizingInputText = forwardRef((props, ref) => {

    /* useRef */
    const textareaRef = useRef(null);

    /* useEffect */
    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';      // Reset the Height
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
            textareaRef.current.scrollTop = textareaRef.current.scrollHeight;
        }
    }, [props?.value]);

    return (
        <div className='auto_resizing_text'>
            <div id='container'>
                <textarea rows={1}
                    ref={textareaRef}
                    value={props?.value}
                    placeholder='Type a message...'
                    {...props} />
            </div>
        </div >
    );
});

export default AutoResizingInputText;