import React, { useEffect, useState } from 'react';

/*** CSS Imports ***/
import './ResetPassword.css';

/*** Router Imports ***/
import { useNavigate, useSearchParams } from 'react-router-dom';

/*** Redux Imports ***/
import { useResetPasswordMutation } from 'redux-app/apis/AuthAPI';

/*** Component Imports ***/
import AuthForm from 'components/Common/AuthForm/AuthForm';
import FormInputPassword from 'components/Form/SPFormInputPassword/SPFormInputPassword';
import FormButton from 'components/Form/SPFormButton/SPFormButton';
import { Bars } from 'react-loader-spinner';

/*** Function Imports ***/
import validatePassword from 'functions/validatePassword';

function ResetPassword() {

    /* Constants & Variables */
    const initData = {
        password: '', cfmPassword: ''
    }
    let err = {}

    /* useState */
    const [formData, setFormData] = useState(initData);
    const [formError, setFormError] = useState({});

    /* Router */
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    /* Redux */
    const [resetPassword, { isSuccess, error, isLoading }] = useResetPasswordMutation();

    /* Functions */
    const checkPasswords = (password, cfmPassword) => {
        if (password.length === 0) {
            err['password'] = 'Password must not be empty';
        }
        else if (password.length < 8) {
            err['password'] = 'Minimum password length is 8';
        }
        else if (password.length > 24) {
            err['password'] = 'Maximum password length is 24';
        }
        else if (!validatePassword(password)) {
            err['password'] = 'Password must contain at least one uppercase, lowercase, number and special character';
        }
        else if (cfmPassword !== password) {
            err['cfmPassword'] = 'Passwords do not match';
        }
    }

    const checkData = () => {
        checkPasswords(formData?.password, formData?.cfmPassword);

        if (Object.keys(err).length !== 0) {
            setFormError(err);
            return false;
        }
        else {
            setFormError({});
            return true;
        }
    }

    const handleSave = () => {
        if (checkData()) {
            setFormError({});
            resetPassword({
                email: searchParams.get('email'),
                token: searchParams.get('token'),
                password: formData.password
            });
        }
    }

    /* useEffect */
    useEffect(() => {
        if (!searchParams.get('token') && !searchParams.get('email')) {
            navigate('/password/forgot');
        }
    }, [navigate, searchParams]);

    useEffect(() => {
        if (isSuccess) {
            navigate('/password/reset/success');
        }

        if (error) {
            setFormError({ password: error?.data?.message });
        }
    }, [isSuccess, error, navigate]);

    return (
        <AuthForm
            title='Reset Password'
            header='Reset Password'>
            <div className='w-100 mt-3'>
                <FormInputPassword
                    label='New Password'
                    placeholder='Enter New Password'
                    autoFocus
                    value={formData?.password}
                    onChange={(e) => setFormData({
                        ...formData, password: e.target.value
                    })}
                    error={formError?.password} />
                <FormInputPassword
                    label='Confirm Password'
                    placeholder='Enter Confirm Password'
                    value={formData?.cfmPassword}
                    onChange={(e) => setFormData({
                        ...formData, cfmPassword: e.target.value
                    })}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') handleSave();
                    }}
                    error={formError?.cfmPassword} />
            </div>
            <div className='w-100 mt-3'>
                <FormButton
                    onClick={() => handleSave()}
                    disabled={isLoading ? true : false}>
                    {
                        isLoading
                            ? <Bars visible height='30' width='30'
                                color='#FFFFFF' />
                            : 'Save Password'
                    }
                </FormButton>
            </div>
        </AuthForm>
    );
}

export default ResetPassword;