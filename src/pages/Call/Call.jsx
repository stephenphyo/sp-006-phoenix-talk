import React, { useState, useEffect, useRef } from 'react';

/*** Utility Imports ***/
import socketio from 'utils/socketio';

function Call() {

    /* useRef */
    const socketRef = useRef(socketio());

    const [stream, setStream] = useState(null);
    const [callActive, setCallActive] = useState(false);
    const userVideo = useRef();
    const partnerVideo = useRef();
    const peerConnection = useRef();

    const servers = {
        iceServers: [
            {
                urls: 'stun:stun.stunprotocol.org',
            },
        ],
    };

    useEffect(() => {
        // Get user media (camera and microphone)
        navigator.mediaDevices
            .getUserMedia({ video: true, audio: true })
            .then((currentStream) => {
                setStream(currentStream);
                userVideo.current.srcObject = currentStream;
            });

        // Listen for incoming calls
        socketRef.current.on('call-made', async (data) => {
            if (callActive) {
                const confirmed = window.confirm(
                    'You have an incoming call. Do you want to answer it?'
                );

                if (!confirmed) {
                    return socketRef.current.emit('reject-call', {
                        from: data.from,
                    });
                }
            }

            setCallActive(true);

            peerConnection.current = new RTCPeerConnection(servers);
            peerConnection.current.addStream(stream);

            peerConnection.current.ontrack = (event) => {
                partnerVideo.current.srcObject = event.streams[0];
            };

            await peerConnection.current.setRemoteDescription(
                new RTCSessionDescription(data.offer)
            );

            const answer = await peerConnection.current.createAnswer();
            await peerConnection.current.setLocalDescription(new RTCSessionDescription(answer));

            socketRef.current.emit('make-answer', {
                answer,
                to: data.from,
            });
        });

        // Listen for answers to calls made
        socketRef.current.on('answer-made', async (data) => {
            await peerConnection.current.setRemoteDescription(
                new RTCSessionDescription(data.answer)
            );

            setCallActive(true);
        });
    }, [stream, callActive]);

    const callUser = async (userId) => {
        peerConnection.current = new RTCPeerConnection(servers);
        peerConnection.current.addStream(stream);

        peerConnection.current.ontrack = (event) => {
            partnerVideo.current.srcObject = event.streams[0];
        };

        const offer = await peerConnection.current.createOffer();
        await peerConnection.current.setLocalDescription(new RTCSessionDescription(offer));

        socketRef.current.emit('call-user', {
            offer,
            to: userId,
        });
    };

    return (
        <div>
            <h1>Video Call Application</h1>
            <div>
                <video playsInline muted ref={userVideo} autoPlay style={{ width: '300px' }} />
                <video playsInline ref={partnerVideo} autoPlay style={{ width: '300px' }} />
            </div>
            <button onClick={() => callUser('another-user-id')}>
                Call Another User
            </button>
        </div>
    );
}

export default Call;