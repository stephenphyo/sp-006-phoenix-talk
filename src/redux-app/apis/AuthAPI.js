/*** Slice Imports ***/
import { login, logout } from 'redux-app/slices/AuthSlice';

/*** API Imports  ***/
import BaseAPI from './BaseAPI';

/*** Package Imports ***/
import Cookies from 'js-cookie';

/*** Utility Imports ***/
import socketio from 'utils/socketio';

/** Declarations **/
const socket = socketio();

const AuthAPI = BaseAPI.injectEndpoints({
    endpoints: (builder) => ({

        login: builder.mutation({
            query: (body) => {
                return {
                    url: '/login',
                    method: 'POST',
                    body: body,
                    credentials: 'include',
                }
            },
            async onQueryStarted(args, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    dispatch(login(data?.data));
                }
                catch (err) {
                    console.log(err);
                }
            }
        }),

        logout: builder.query({
            query: () => {
                return {
                    url: '/logout',
                    credentials: 'include'
                }
            },
            async onQueryStarted(args, { dispatch, queryFulfilled, getState }) {
                try {
                    const state = getState();
                    const userId = state.auth.account?._id;
                    console.log(userId);

                    await queryFulfilled;
                    dispatch(logout());
                    Cookies.remove('token');

                    socket.emit('userLogout', userId);
                }
                catch (err) {
                    console.log(err);
                }
            }
        }),

        register: builder.mutation({
            query: (body) => {
                return {
                    url: '/register',
                    method: 'POST',
                    body: body,
                    credentials: 'include',
                }
            },
            async onQueryStarted(args, { dispatch, queryFulfilled }) {
                try {
                    await queryFulfilled;
                }
                catch (err) {
                    console.log(err);
                }
            }
        }),

        forgotPassword: builder.mutation({
            query: (body) => {
                return {
                    url: `/password/forgot`,
                    method: 'POST',
                    body: body
                }
            }
        }),

        resetPassword: builder.mutation({
            query: (body) => {
                return {
                    url: `/password/reset`,
                    method: 'POST',
                    body: body
                }
            }
        }),

        updatePassword: builder.mutation({
            query: (body) => {
                return {
                    url: `/password/update`,
                    method: 'PUT',
                    body: body,
                    credentials: 'include'
                }
            }
        }),

    })
});

export const {
    useLoginMutation,
    useLazyLogoutQuery,
    useRegisterMutation,
    useForgotPasswordMutation,
    useResetPasswordMutation,
    useUpdatePasswordMutation
} = AuthAPI;

export default AuthAPI;