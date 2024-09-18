import { createSlice } from '@reduxjs/toolkit';

/* Initial State */
const initialState = {
    account: null,
    accessToken: null
}

/* Reducer */
const reducers = {
    login: (state, action) => {
        state.account = action.payload;
    },

    logout: (state) => {
        state.account = null;
        return {};
    },

    setAccessToken: (state, action) => {
        const { accessToken } = action.payload;
        state.accessToken = accessToken;
    }
}

/* Slice */
export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers
});

/* Actions */
export const { login, logout, setAccessToken } = authSlice.actions;

export default authSlice.reducer;