import React, { useEffect } from 'react';

/*** CSS Imports ***/
import './ChatMessage.css';

/*** Component Imports ***/
import Avatar from 'components/Main/Avatar/Avatar';

/*** Package Imports ***/
import moment from 'moment';

function ChatMessage({ data, isUserMessage, isSameSender, ...props }) {

    return (
        <div
            className={`chat_message ${isUserMessage ? 'start' : 'end'}`}
            {...props}>
            <div className='d-flex'>
                <Avatar
                    className='chat_message_avatar'
                    image={data?.sender?.avatar?.url}
                    alt='avatar'
                    style={{
                        '--size': '2rem', alignSelf: 'flex-end',
                        visibility: `${isSameSender ? 'hidden' : 'visible'}`
                    }}
                />
                <div className={`chat_message_bubble ${!isSameSender && 'end'}`}>
                    <div className='d-flex flex-column w-100'>
                        <div className='chat_message_bubble_contents'>
                            {
                                data?.type === 'text' ? (
                                    <span>{data?.content?.text}</span>
                                )
                                    : data?.type === 'image' && (
                                        <div id='msg_image'>
                                            <div className='msg_image_wrapper'>
                                                {data?.images.slice(0, 4).map((url, idx) => (
                                                    <div id={idx === 3 ? 'last_image' : ''} key={idx}>
                                                        <img src={url} alt={`img_${idx}`} />
                                                        {data?.images.length > 4 && idx === 3 && (
                                                            <div id='overlay'>
                                                                + {data?.images.length - 4}
                                                            </div>
                                                        )}
                                                    </div>
                                                ))}
                                            </div>
                                            <span>{data?.text}</span>
                                        </div>
                                    )
                            }
                        </div>
                        <div className='chat_message_bubble_info'>
                            <span>{moment(data?.createdAt).format('HH:mm')}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ChatMessage;