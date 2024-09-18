import { createSlice } from '@reduxjs/toolkit';

/*** Redux Imports ***/
import { useSelector } from 'react-redux';


/* Initial State */
const initialState = {
    socket: null
}

/* Reducer */
const reducers = {
    setSocket: (state, action) => {
        state.socket = action.payload;
    },
}

/* Slice */
export const socketSlice = createSlice({
    name: 'socket',
    initialState,
    reducers
});

/* Actions */
export const { setSocket } = socketSlice.actions;

export default socketSlice.reducer;