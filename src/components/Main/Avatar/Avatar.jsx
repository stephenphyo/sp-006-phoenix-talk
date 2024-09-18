import React from 'react';

/*** CSS Imports ***/
import './Avatar.css';

function Avatar({ image, alt, userStatus, ...props }) {
    const { className, ...otherProps } = props;
    return (
        <div className={`avatar ${className}`} {...otherProps}>
            <img src={image} alt={alt} />
            {
                userStatus !== 'none' &&
                <span id={userStatus || 'offline'}></span>
            }
        </div>
    );
}

export default Avatar;