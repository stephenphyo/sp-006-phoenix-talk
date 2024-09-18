import React, { useEffect, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

/*** CSS Imports ***/
import './App.css';

/*** Package Imports ***/
import { Toaster } from 'react-hot-toast';

/*** Redux Imports ***/
import { useSelector } from 'react-redux';

/*** Context Imports ***/
import { OnlineUsersContextProvider } from 'contexts/OnlineUsersContext';
import { ChatspaceContextProvider } from 'contexts/ChatspaceContext';

/*** Layout Imports ***/
import MainLayout from 'layouts/MainLayout/MainLayout';
import FormLayout from 'layouts/FormLayout/FormLayout';

/*** Utility Imports ***/
import socketio from 'utils/socketio';

/*** Page Imports ***/
import Chatspace from 'pages/Chatspace/Chatspace';
import Login from 'pages/Authentication/Login/Login';
import Register from 'pages/Authentication/Register/Register';
import ForgotPassword from 'pages/Authentication/ForgotPassword/ForgotPassword';
import ResetPassword from 'pages/Authentication/ResetPassword/ResetPassword';
import ResetPasswordSuccess from 'pages/Authentication/ResetPasswordSuccess/ResetPasswordSuccess';
import ProtectedRoute from 'components/Common/ProtectedRoute/ProtectedRoute';

import Call from 'pages/Call/Call';

function App() {

    const { account, accessToken } = useSelector(state => state.auth);
    const isLoading = false;

    /* useRef */
    const socketRef = useRef(socketio());

    /* useEffect */
    useEffect(() => {
        if (account) {
            socketRef.current.emit('connectUser', account._id);
        }
    }, [account]);

    return (
        <main className='app'>
            <ChatspaceContextProvider>
                <OnlineUsersContextProvider>
                    <Toaster position='top-right' />
                    <Router>
                        <Routes>

                            <Route element={<ProtectedRoute accessToken={accessToken} account={account} isLoading={isLoading} />}>
                                <Route element={<MainLayout />}>
                                    <Route path='/' element={<Chatspace />} />
                                    <Route path='/call' element={<Call />} />
                                </Route>
                            </Route>

                            <Route element={<FormLayout />}>
                                <Route path='/login' element={<Login />} />
                                <Route path='/register' element={<Register />} />
                                <Route path='/password/forgot' element={<ForgotPassword />} />
                                <Route path='/password/reset' element={<ResetPassword />} />
                                <Route path='/password/reset/success' element={<ResetPasswordSuccess />} />
                            </Route>

                        </Routes>
                    </Router>
                </OnlineUsersContextProvider>
            </ChatspaceContextProvider>
        </main>
    );
}

export default App;