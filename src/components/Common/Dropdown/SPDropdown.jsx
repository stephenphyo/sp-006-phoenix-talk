import React, { createContext, useState, useRef, useEffect, useContext } from 'react';

/*** CSS Imports ***/
import './SPDropdown.css';

/*** Icon Imports ***/
import { IoMdArrowDropdown } from "react-icons/io";

/*** Context ***/
const DropdownContext = createContext();

/*** Context Provider ***/
const DropdownContextProvider = (props) => {
    /* useState */
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    /* Context Values */
    const value = {
        isDropdownOpen, setIsDropdownOpen
    };

    return (
        <DropdownContext.Provider value={value}>
            {props.children}
        </DropdownContext.Provider>
    );
}

/*** Dropdown ***/
function SPDropdown(props) {
    return (
        <DropdownContextProvider>
            <div className='sp-dropdown'>
                {props.children}
            </div>
        </DropdownContextProvider>
    );
}

/*** Dropdown Title ***/
function Title(props) {
    /* useContext */
    const { isDropdownOpen, setIsDropdownOpen } = useContext(DropdownContext);

    /* Functions */
    const handleClick = (e) => {
        e.stopPropagation();
        setIsDropdownOpen(!isDropdownOpen);
    }

    return (
        <p className='sp-dropdown-title'
            onClick={(e) => handleClick(e)}>
            {props.children}
            {props?.enableArrow && <IoMdArrowDropdown size={22} />}
        </p>
    )
}

/*** Dropdown Menu ***/
function Menu(props) {

    const { align, ...otherProps } = props;

    /* useContext */
    const { isDropdownOpen, setIsDropdownOpen } = useContext(DropdownContext);

    /* useRef */
    const dropdownRef = useRef(null);

    /* useEffect */
    useEffect(() => {
        const handleExternalClick = (e) => {
            if (isDropdownOpen && dropdownRef.current
                && !dropdownRef.current.contains(e.target)) {
                setIsDropdownOpen(false);
            }
        }
        document.addEventListener('click', handleExternalClick);

        return () => {
            document.removeEventListener('click', handleExternalClick);
        }
    }, [isDropdownOpen, setIsDropdownOpen]);

    return (
        <ul ref={dropdownRef} onClick={() => setIsDropdownOpen(false)}
            className={`sp-dropdown-menu ${isDropdownOpen ? 'open' : ''}`}
            style={align === 'right' ? { right: 0 } : { left: 0 }}>
            {otherProps.children}
        </ul>
    );
}

/*** Dropdown Item ***/
function Item(props) {
    const { clickable, ...otherProps } = props;
    return (
        <div className={`sp-dropdown-item ${clickable ? 'clickable' : ''}`}
            {...otherProps}>
            <span className='dropdown-item-icon-left'>{props.leftIcon}</span>
            {props.children}
            <span className='dropdown-item-icon-right'>{props.rightIcon}</span>
        </div>
    );
}

Item.defaultProps = {
    clickable: true
};

/*** Dropdown Separator ***/
function Separator(props) {
    return (
        <div className='sp-dropdown-separator'>
            <hr style={{
                backgroundColor: props?.color ?? '#FFFFFF',
                height: props?.height ?? '1px'
            }} />
        </div>
    );
}

SPDropdown.Title = Title
SPDropdown.Menu = Menu;
SPDropdown.Item = Item;
SPDropdown.Separator = Separator;

export default SPDropdown;