import React from 'react';

/*** CSS Imports ***/
import './AuthForm.css';

/*** Resource Imports ***/
import logo from 'res/images/logo.jpg';

function AuthForm(props) {
    return (
        <div className='auth_form'>
            {props.children}
        </div>
    )
}

/*** Form Logo ***/
function Logo(props) {
    return (
        <div className='auth_form_logo'
            {...props}>
            <img src={logo || 'Logo'} alt='logo' />
        </div>
    )
}

/*** Form Header ***/
function Header({ headers }) {
    return (
        <div className='auth_form_header'>
            <h2>{headers?.main || 'Main Header'}</h2>
            <h3>{headers?.sub || 'Sub Header'}</h3>
        </div>
    )
}

/*** Form Body ***/
function Body(props) {
    return (
        <div className='auth_form_body'>
            <div className='row w-100'>
                {props.children}
            </div>
        </div>
    )
}

/*** Form Footer ***/
function Footer(props) {
    return (
        <div className='auth_form_footer'>
            <div className='row w-100'>
                {props.children}
            </div>
        </div>
    );
}

AuthForm.Logo = Logo;
AuthForm.Header = Header;
AuthForm.Body = Body;
AuthForm.Footer = Footer;

export default AuthForm;