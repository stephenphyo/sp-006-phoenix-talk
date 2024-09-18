import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

/*** Slice Imports ***/
import { setUserChats, setChatMessages } from 'redux-app/slices/ChatSlice';

/*** API Imports ***/

/** Declarations **/
const devURL = 'http://localhost:9014'

const ChatAPI = createApi({
    reducerPath: 'ChatAPI',
    baseQuery: fetchBaseQuery({
        baseUrl: `${process.env.REACT_APP_API_URL || devURL}/api/v1/chat`,
        credentials: 'include'
    }),
    tagTypes: ['Chat'],
    endpoints: (builder) => ({

        getUserChats: builder.query({
            providesTags: ['GetUserChats'],
            query: () => {
                return {
                    url: '/',
                }
            },
            async onQueryStarted(args, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    dispatch(setUserChats(data?.data));
                }
                catch (err) {
                    console.log(err);
                }
            }
        }),

        getChat: builder.query({
            providesTags: ['GetChatInformation'],
            query: (id) => {
                return {
                    url: `/${id}`,
                }
            },
            transformResponse: (res) => res.data,
            async onQueryStarted(args, { dispatch, queryFulfilled }) {
                try {
                    await queryFulfilled;
                }
                catch (err) {
                    console.log(err);
                }
            }
        }),

        getChatMessages: builder.query({
            providesTags: ['GetChatMessages'],
            query: (id) => {
                return {
                    url: `/${id}/messages`,
                }
            },
            transformResponse: (res) => res.data,
            async onQueryStarted(args, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    dispatch(setChatMessages(data));
                }
                catch (err) {
                    console.log(err);
                }
            }
        }),
    })
});

export const {
    useLazyGetUserChatsQuery,
    useLazyGetChatQuery,
    useLazyGetChatMessagesQuery
} = ChatAPI;

export default ChatAPI;