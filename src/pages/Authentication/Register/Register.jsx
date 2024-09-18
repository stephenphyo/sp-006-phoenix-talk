import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

/*** CSS Imports ***/
import './Register.css';

/*** Redux Imports ***/
import { useRegisterMutation } from 'redux-app/apis/AuthAPI';

/*** Component Imports ***/
import AuthForm from 'components/Common/AuthForm/AuthForm';
import FormInputText from 'components/Form/SPFormInputText/SPFormInputText';
import FormInputPassword from 'components/Form/SPFormInputPassword/SPFormInputPassword';
import FormButton from 'components/Form/SPFormButton/SPFormButton';
import Metadata from 'components/Common/Metadata/Metadata';

/*** Package Imports ***/
import { Bars } from 'react-loader-spinner';

function Register() {

    /* useState */
    const [data, setData] = useState({
        firstName: '',
        lastName: '',
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    /* Router */
    const navigate = useNavigate();

    /* Redux */

    /* Custom Hooks */
    const [register, { isLoading, isSuccess }] = useRegisterMutation();

    /* Functions */
    const handleRegister = () => {
        register(data)
    };

    /* useEffect */
    useEffect(() => {
        if (isSuccess) navigate('/login');
    }, [isSuccess, navigate]);

    return (
        <div className='register'>
            <Metadata title='Register Account' />
            <AuthForm>
                <AuthForm.Logo onClick={() => navigate('/')} />
                <AuthForm.Header
                    headers={{
                        main: 'Phoenix Talk',
                        sub: 'Register New Account'
                    }}
                />
                <AuthForm.Body>
                    <FormInputText
                        className='col-12 col-md-6'
                        label='First Name'
                        placeholder='Stephen'
                        onChange={(e) => setData({ ...data, firstName: e.target.value })} />
                    <FormInputText
                        className='col-12 col-md-6'
                        label='Last Name'
                        placeholder='Phyo'
                        onChange={(e) => setData({ ...data, lastName: e.target.value })} />
                    <FormInputText
                        label='Username'
                        placeholder='Enter Username'
                        onChange={(e) => setData({ ...data, username: e.target.value })} />
                    <FormInputText
                        label='Email'
                        placeholder='Enter Email Address'
                        onChange={(e) => setData({ ...data, email: e.target.value })} />
                    <FormInputPassword
                        label='Password'
                        placeholder='Enter Password'
                        onChange={(e) => setData({ ...data, password: e.target.value })} />
                    <FormInputPassword
                        label='Confirm Password'
                        placeholder='Enter Confirm Password'
                        onChange={(e) => setData({ ...data, confirmPassword: e.target.value })} />
                </AuthForm.Body>
                <AuthForm.Footer>
                    <FormButton text='Register'
                        onClick={() => handleRegister()}
                        disabled={isLoading}>
                        {
                            isLoading
                                ? <Bars visible width='25' height='25'
                                    color='#FFFFFF' />
                                : 'Register'
                        }
                    </FormButton>
                    <div className='register_footer'>
                        <span>Already have an account?</span>
                        <span id='login'
                            onClick={() => navigate('/login')}>
                            Login
                        </span>
                    </div>
                </AuthForm.Footer>
            </AuthForm>
        </div>
    );
}

export default Register;