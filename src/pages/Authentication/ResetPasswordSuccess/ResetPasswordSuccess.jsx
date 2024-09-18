import React from 'react';

/*** Component Imports ***/
import AuthForm from 'components/Common/AuthForm/AuthForm';
import FormButton from 'components/Form/SPFormButton/SPFormButton';

/*** Router Imports ***/
import { useNavigate } from 'react-router-dom';

function ResetPasswordSuccess() {

    /* Router */
    const navigate = useNavigate();

    return (
        <AuthForm
            title='Reset Password Successful'>
            <div>ResetPasswordSuccess</div>
            <div className='w-100 mt-3'>
                <FormButton
                    onClick={() => navigate('/login')}>
                    Go to Login
                </FormButton>
            </div>
        </AuthForm>
    )
};

export default ResetPasswordSuccess;