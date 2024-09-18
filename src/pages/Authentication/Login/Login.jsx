import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

/*** CSS Imports ***/
import './Login.css';

/*** Redux Imports ***/
import { useLoginMutation } from 'redux-app/apis/AuthAPI';

/*** Component Imports ***/
import AuthForm from 'components/Common/AuthForm/AuthForm';
import FormInputText from 'components/Form/SPFormInputText/SPFormInputText';
import FormInputPassword from 'components/Form/SPFormInputPassword/SPFormInputPassword';
import FormButton from 'components/Form/SPFormButton/SPFormButton';
import Metadata from 'components/Common/Metadata/Metadata';

/*** Package Imports ***/
import { Bars } from 'react-loader-spinner';

/*** Resource Imports ***/

function Login() {

    /* Router */
    const navigate = useNavigate();

    /* useState */
    const [data, setData] = useState({
        email: '',
        password: ''
    });
    const [formError, setFormError] = useState({});

    /* Redux */
    const [login, resultLogin] = useLoginMutation();

    /* Functions */
    const handleLogin = () => {
        login(data);
    }

    /* useEffect */
    useEffect(() => {
        if (resultLogin.isSuccess) navigate('/');
    }, [resultLogin]);

    useEffect(() => {
        setFormError({});
        if (resultLogin.error?.status === 404) {
            setFormError({ ...formError, email: resultLogin.error?.data?.message });
        }
        if (resultLogin.error?.status === 401) {
            setFormError({ ...formError, password: resultLogin.error?.data?.message });
        }
    }, [resultLogin]);

    return (
        <div className='login'>
            <Metadata title='Login' />
            <AuthForm>
                <AuthForm.Logo onClick={() => navigate('/')} />
                <AuthForm.Header
                    headers={{
                        main: 'Phoenix Talk',
                        sub: 'Login to Account'
                    }}
                />
                <AuthForm.Body>
                    <FormInputText
                        label='Email'
                        placeholder='Enter Email Address'
                        autoFocus
                        onChange={(e) => setData({ ...data, email: e.target.value })}
                        onKeyPress={(e) => {
                            if (e.key === 'Enter') handleLogin();
                        }}
                        error={formError?.email} />
                    <FormInputPassword
                        label='Password'
                        placeholder='Enter Password'
                        onChange={(e) => setData({ ...data, password: e.target.value })}
                        onKeyPress={(e) => {
                            if (e.key === 'Enter') handleLogin();
                        }}
                        error={formError?.password} />
                    <div className='login_sub'>
                        <div id='remember'>
                            <input type='checkbox' />
                            <span>Remember Me</span>
                        </div>
                        <div id='forgot'
                            onClick={() => navigate('/password/forgot')}>
                            <span>Forgot Password?</span>
                        </div>
                    </div>
                </AuthForm.Body>
                <AuthForm.Footer>
                    <FormButton
                        onClick={() => handleLogin()}
                        disabled={resultLogin.isLoading}>
                        {
                            resultLogin.isLoading
                                ? <Bars visible width='25' height='25'
                                    color='#FFFFFF' />
                                : 'Sign In'
                        }
                    </FormButton>
                    <div className='login_footer'>
                        <span>Don't have an account?</span>
                        <span id='register'
                            onClick={() => navigate('/register')}>
                            Register
                        </span>
                    </div>
                </AuthForm.Footer>
                <div className='login_separator'>
                    <hr />
                    <div>or</div>
                    <hr />
                </div>
                <AuthForm.Footer>
                    <div className='login_options'>
                        <FormButton id='google'>
                            Sign in with Google
                        </FormButton>
                        <FormButton id='facebook'>
                            Sign in with Facebook
                        </FormButton>
                        <FormButton id='instagram'>
                            Sign in with Instagram
                        </FormButton>
                    </div>
                </AuthForm.Footer>
            </AuthForm>
        </div>
    );
}

export default Login;