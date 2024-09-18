import React from 'react';

/*** CSS Imports ***/
import './Tooltip.css';

const Tooltip = ({ text, children }) => {
    return (
        <div className='tooltip-container'>
            {children}
            <div className='tooltip-text'>
                {text || 'Tooltip'}
            </div>
        </div>
    );
};

export default Tooltip;