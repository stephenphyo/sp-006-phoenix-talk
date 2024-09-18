import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

/*** CSS Imports ***/
import './ResetPasswordOTP.css';

/*** Component Imports ***/
import Metadata from 'components/Common/Metadata/Metadata';
import FormButton from 'components/Form/FormButton/FormButton';

function ResetPassword() {

    /* useState */
    const [otp, setOtp] = useState(['', '', '', '', '', '']);

    /* useRef */
    const inputRefs = useRef([]);

    /* Functions */
    const handleOtpInput = (index, value) => {
        if (!isNaN(value) && value.length <= 1) {
            const newOtp = [...otp];
            newOtp[index] = value;
            setOtp(newOtp);

            if (value && index < otp.length - 1) {
                inputRefs.current[index + 1].focus();
                setTimeout(() => inputRefs.current[index + 1].select(), 0);
            }
        }
    }

    const handlePaste = (e) => {
        const clipboardData = e.clipboardData || window.clipboardData;
        const pastedData = clipboardData.getData('text').trim();
        const newOtp = [];

        for (let i = 0; i < otp.length && i < pastedData.length; i++) {
            newOtp[i] = pastedData[i];
        }

        setOtp(newOtp);
    };

    const handleKeyEvents = (index, e) => {
        if (e.key === 'ArrowLeft' && index > 0) {
            inputRefs.current[index - 1].focus();
            setTimeout(() => inputRefs.current[index - 1].select(), 0);
        }

        if (e.key === 'ArrowRight' && index < otp.length - 1) {
            inputRefs.current[index + 1].focus();
            setTimeout(() => inputRefs.current[index + 1].select(), 0);
        }

        if (e.key === 'Backspace' && index > 0) {
            handleOtpInput(index, '');
            setTimeout(() => inputRefs.current[index - 1].focus(), 0);
        }
    }

    /* useEffect */
    useEffect(() => {
        console.log(otp.join(''));
    }, [otp]);

    return (
        <div className='resetpwd'>
            <Metadata title='Reset Password' />
            <div className='resetpwd_header'>
                <span>Phoenix Shop</span>
                <span>Reset Password</span>
            </div>
            <div className='resetpwd_fields'>
                {
                    otp.map((digit, index) => (
                        <input key={index} type='text'
                            value={digit}
                            ref={(ref) => inputRefs.current[index] = ref}
                            onChange={(e) => handleOtpInput(index, e.target.value)}
                            onKeyDown={(e) => handleKeyEvents(index, e)}
                            onPaste={(e) => handlePaste(e)} />
                    ))
                }
            </div>
            <div className='w-100 mt-3'>
                <FormButton>
                    Reset Password
                </FormButton>
            </div>
        </div>
    );
}

export default ResetPassword;