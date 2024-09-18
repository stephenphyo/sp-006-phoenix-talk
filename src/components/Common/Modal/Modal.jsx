import { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

/*** CSS Imports ***/
import './Modal.css';

const Modal = ({ showModal, setShowModal, ...props }) => {

    /* useState */
    const [readyDom, setReadyDom] = useState(false);

    /* useEffect */
    useEffect(() => {
        setReadyDom(true);
    }, []);

    const handleOverlayClick = (e) => {
        if (e.target.classList.contains('sp-modal-overlay')) {
            setShowModal(false);
        }
    }

    return showModal && readyDom
        ? ReactDOM.createPortal(
            <div className='sp-modal-overlay'
                onClick={handleOverlayClick}>
                {props.children}
            </div>,
            document.getElementById('root')
        )
        : null;
};

export default Modal;