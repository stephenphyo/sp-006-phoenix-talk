import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

/*** API Imports ***/

/** Declarations **/
const devURL = 'http://localhost:9014'

const MessageAPI = createApi({
    reducerPath: 'MessageAPI',
    baseQuery: fetchBaseQuery({
        baseUrl: `${process.env.REACT_APP_API_URL || devURL}/api/v1/message`,
        credentials: 'include'
    }),
    tagTypes: ['Message'],
    endpoints: (builder) => ({

        sendPrivateMessage: builder.mutation({
            query: (body) => {
                return {
                    url: '/private',
                    method: 'POST',
                    body: body,
                    credentials: 'include'
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

    })
});

export const {
    useSendPrivateMessageMutation,
} = MessageAPI;

export default MessageAPI;