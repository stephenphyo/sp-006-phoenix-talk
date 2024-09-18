import React, { forwardRef, useEffect, useCallback } from 'react';

/*** CSS Imports ***/
import './ContextMenu.css';

const ContextMenu = forwardRef(({ isVisible, setIsVisible, ...props }, ref) => {

    /* Default Style */
    const menuStyle = {
        display: isVisible ? 'block' : 'none',
        position: 'absolute',
        left: props.x || '20rem',
        top: props.y || '20rem',
        zIndex: 1000,
    };

    /* useCallback */
    const handleExternalClick = useCallback((e) => {
        if (ref.current && !ref.current.contains(e.target)) {
            setIsVisible(false);
        }
    }, [ref, setIsVisible]);

    /* useEffect */
    useEffect(() => {
        document.addEventListener('mousedown', handleExternalClick);
        document.addEventListener('touchstart', handleExternalClick);
        return () => {
            document.removeEventListener('mousedown', handleExternalClick);
            document.removeEventListener('touchstart', handleExternalClick);
        }
    }, [handleExternalClick]);

    return (
        isVisible &&
        <div className='context_menu' ref={ref}
            style={menuStyle}
            onClick={(e) => e.stopPropagation()}>
            {props.children}
        </div>
    );
});

/*** Context Menu Option ***/
function Option(props) {
    return (
        <div {...props} className='context_menu_option'>
            {props.children}
        </div>
    );
}

ContextMenu.Option = Option;

export default ContextMenu;