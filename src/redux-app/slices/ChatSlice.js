import { createSlice } from '@reduxjs/toolkit';

/* Initial State */
const initialState = {
    chats: [],
    chatMessages: [],
    selectedChatId: null,
}

/* Reducer */
const reducers = {
    setUserChats: (state, action) => {
        state.chats = action.payload;
    },

    selectChat: (state, action) => {
        state.selectedChatId = action.payload;
    },

    setChatMessages: (state, action) => {
        state.chatMessages = action.payload;
    },

    addChatMessage: (state, action) => {
        state.chatMessages = [...state.chatMessages, action.payload];
    }
}

/* Slice */
export const chatSlice = createSlice({
    name: 'chat',
    initialState,
    reducers
});

/* Actions */
export const {
    setUserChats, selectChat,
    setChatMessages, addChatMessage
} = chatSlice.actions;

export default chatSlice.reducer;