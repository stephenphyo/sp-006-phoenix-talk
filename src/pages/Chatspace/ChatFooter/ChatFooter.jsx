import React, { useState, useEffect, useRef, useContext } from 'react';
import { useSelector } from 'react-redux';

/*** CSS Imports ***/
import './ChatFooter.css';

/*** Component Imports ***/
import AutoResizingInputText from 'components/Form/AutoResizingInputText/AutoResizingInputText';
import Tooltip from 'components/Common/Tooltip/Tooltip';

/*** Redux Imports ***/
import { useSendPrivateMessageMutation } from 'redux-app/apis/MessageAPI';

/*** Context Imports ***/
import ChatspaceContext from 'contexts/ChatspaceContext';

/*** Utility Imports ***/
import socketio from 'utils/socketio';

/*** Firebase Imports ***/
import { uploadFiles } from 'services/firebase/CloudStorage/firebaseCloudStorageUpload';
import { storage } from 'services/firebase/firebase';

/*** Package Imports ***/
import EmojiPicker from 'emoji-picker-react';

/*** Icon Imports ***/
import { SlEmotsmile } from 'react-icons/sl';
import { HiOutlinePlus } from 'react-icons/hi';
import { IoImageOutline } from 'react-icons/io5';

function ChatFooter() {

    /* Redux */
    const { account } = useSelector(state => state.auth);
    const [sendPrivateMessage, resultSendPrivateMessage] = useSendPrivateMessageMutation();

    /* useContext */
    const {
        chat,
        message, setMessage
    } = useContext(ChatspaceContext);

    /* useState */
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const [imageURLs, setImageURLs] = useState([]);
    const [uploadProgress, setUploadProgress] = useState({});

    /* useRef */
    const socketRef = useRef(socketio());
    const emojiRef = useRef(null);
    const fileInputRef = useRef(null);

    /* Functions */
    const handleSendPrivateMessage = async (message) => {
        if (!message) return;

        const recipient = chat?.members?.find((member) => {
            return member._id !== account?._id
        });
        await sendPrivateMessage({
            content: {
                text: message
            },
            recipientId: recipient?._id
        });
        setMessage('');
    }

    const handleSendImages = async (e) => {
        await uploadFiles(storage, 'images/', e.target.files);
    }

    /* useEffect */
    useEffect(() => {
        if (resultSendPrivateMessage.isSuccess) {
            socketRef.current.emit('send_message', resultSendPrivateMessage?.data);
        }
    }, [resultSendPrivateMessage]);

    useEffect(() => {
        const handleExternalClick = (e) => {
            if (emojiRef.current && !emojiRef.current.contains(e.target)) {
                setShowEmojiPicker(false);
            }
        }

        document.addEventListener('mousedown', handleExternalClick);
        document.addEventListener('touchstart', handleExternalClick);
        return () => {
            document.removeEventListener('mousedown', handleExternalClick);
            document.removeEventListener('touchstart', handleExternalClick);
        }
    }, []);

    useEffect(() => {
        console.log(imageURLs);
    }, [imageURLs]);

    useEffect(() => {
        console.log(uploadProgress);
    }, [uploadProgress]);

    return (
        <div className='chat_footer'>
            {
                showEmojiPicker &&
                <div className='chat_footer_emoji' ref={emojiRef}>
                    <EmojiPicker
                        onEmojiClick={(obj) => setMessage((prev) => prev + obj.emoji)} />
                </div>
            }
            <div className='chat_footer_pre'>
                <div className={`chat_footer_pre_option ${true ? 'active' : ''}`}>
                    <SlEmotsmile size={28}
                        onClick={() => setShowEmojiPicker(!showEmojiPicker)} />
                </div>
                <div className={`chat_footer_pre_option active`}>
                    <Tooltip text='Add Image'>
                        <IoImageOutline size={28}
                            onClick={() => fileInputRef.current.click()} />
                        <input type='file' multiple ref={fileInputRef}
                            style={{ display: 'none' }}
                            onChange={(e) => handleSendImages(e)} />
                    </Tooltip>
                </div>
                <div className={`chat_footer_pre_option active`}>
                    <Tooltip text='Add File'>
                        <HiOutlinePlus size={28} />
                    </Tooltip>
                </div>
            </div>
            <div className='chat_footer_input'>
                <AutoResizingInputText value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            e.preventDefault();
                            if (e.shiftKey) {
                                setMessage(`${message}\n`)
                            }
                            else {
                                handleSendPrivateMessage(message);
                            }
                        }
                    }}
                    onFocus={() => {
                        socketRef.current.emit('start_typing', {
                            room: chat?._id,
                            userId: account._id
                        });
                    }}
                    onBlur={() => {
                        socketRef.current.emit('stop_typing', {
                            room: chat?._id,
                            userId: account._id
                        });
                    }} />
            </div >
        </div>
    );
}

export default ChatFooter;