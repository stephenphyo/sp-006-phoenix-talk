import { createSlice } from '@reduxjs/toolkit';

/* Initial State */
const initialState = {
    chats: [],
    selectedChatId: null,
}

/* Reducer */
const reducers = {

    setUserChats: (state, action) => {
        state.chats = action.payload;
    },

    selectChat: (state, action) => {
        state.selectedChatId = action.payload;
    }
}

/* Slice */
export const chatSlice = createSlice({
    name: 'chat',
    initialState,
    reducers
});

/* Actions */
export const { setUserChats, selectChat } = chatSlice.actions;

export default chatSlice.reducer;