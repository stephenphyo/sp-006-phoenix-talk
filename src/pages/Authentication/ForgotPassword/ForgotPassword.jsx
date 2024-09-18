import { useState, useEffect, useRef } from 'react';

/*** CSS Imports ***/
import './ForgotPassword.css';

/*** Component Imports ***/
import AuthForm from 'components/Common/AuthForm/AuthForm';
import FormInputText from 'components/Form/SPFormInputText/SPFormInputText';
import FormButton from 'components/Form/SPFormButton/SPFormButton';
import { Bars } from 'react-loader-spinner';

/*** Redux Imports ***/
import { useForgotPasswordMutation } from 'redux-app/apis/AuthAPI';

/*** Package Imports ***/
import ReCAPTCHA from 'react-google-recaptcha';
import toast from 'react-hot-toast';

/*** Function Imports ***/
import validateEmail from 'functions/validateEmail';

function ForgotPassword() {

    /* useState */
    const [email, setEmail] = useState('');
    const [isHuman, setIsHuman] = useState(null);
    const [formError, setFormError] = useState('');

    /* useRef */
    const recaptchaRef = useRef();

    /* Redux */
    const [forgotPassword, { isSuccess, error, isLoading }] = useForgotPasswordMutation();

    /* Functions */
    const checkEmail = () => {
        if (!email || !validateEmail(email)) {
            setFormError('Invalid Email Address');
            return false;
        }
        return true;
    }

    const handleForgotPassword = () => {
        if (isHuman && checkEmail()) {
            setFormError('');
            forgotPassword({ email });
        }
    }

    useEffect(() => {
        if (isSuccess) {
            toast.success('Reset Password Email has been sent');
            setEmail('');
            recaptchaRef.current.reset();
        }

        if (error) {
            setFormError(error?.data?.message);
        }
    }, [isSuccess, error]);

    return (
        <AuthForm
            title='Forgot Password'
            header='Forgot Password'>
            <div className='forgotpwd_fields'>
                <FormInputText
                    label='Email'
                    placeholder='Enter Email Address'
                    autoFocus
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    error={formError} />
            </div>
            <div className='forgotpwd_recaptcha'>
                <ReCAPTCHA
                    ref={recaptchaRef}
                    sitekey={process.env.REACT_APP_GOOGLE_RECAPTCHA_SITE_KEY}
                    onChange={() => setIsHuman(true)}
                    onExpired={() => setIsHuman(null)}
                    theme='dark' />
            </div>
            <div className='w-100 mt-3'>
                <FormButton
                    onClick={() => handleForgotPassword()}
                    disabled={isLoading ? true : false}>
                    {
                        isLoading
                            ? <Bars visible height='30' width='30'
                                color='#FFFFFF' />
                            : 'Reset Password'
                    }
                </FormButton>
            </div>
        </AuthForm>
    );
}

export default ForgotPassword;