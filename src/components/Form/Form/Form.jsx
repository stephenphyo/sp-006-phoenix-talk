import React, { useState } from 'react';

/*** CSS Imports ***/
import './Form.css';

/*** Icon Imports ***/
import { TiArrowSortedDown } from 'react-icons/ti';

function Form(props) {
    return (
        <div className='form'>
            {props.children}
        </div>
    );
}

/*** Form Header ***/
function Header({ headers }) {
    return (
        <div className='form_header'>
            <span id='large'>{headers?.large}</span>
            <span id='small'>{headers?.small}</span>
        </div>
    )
}

/*** Form Body ***/
function Body(props) {
    return (
        <div className='form_body'>
            <div className='row w-100'>
                {props.children}
            </div>
        </div>
    );
}

/*** Form View ***/
function View({ children, title, isCollapsible }) {

    /* useState */
    const [isCollapsed, setIsCollapsed] = useState(false);

    return (
        <div className='form_view'>
            {
                (isCollapsible || title) &&
                <div className='form_view_header'>
                    <span className='form_view_header_title'>
                        {title ?? title}
                    </span>
                    {
                        isCollapsible &&
                        <div onClick={() => setIsCollapsed(!isCollapsed)}>
                            <div className={`form_view_header_arrow`}>
                                <TiArrowSortedDown size={22} />
                            </div>
                        </div>
                    }
                </div>
            }
            <div className={`form_view_content ${isCollapsed ? 'collapse' : 'expand'}`}>
                <div className='row w-100'>
                    {children}
                </div>
            </div>
        </div>
    );
}

/*** Form Footer ***/
function Footer(props) {
    return (
        <div className='form_footer'>
            <div className='row w-100'>
                {props.children}
            </div>
        </div>
    );
}

Form.Header = Header;
Form.Body = Body;
Form.View = View;
Form.Footer = Footer;

export default Form;