import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storageSession from 'redux-persist/lib/storage/session';

/*** Slice Imports ***/
import AuthSlice from './slices/AuthSlice';
import ChatSlice from './slices/ChatSlice';

/*** API Imports ***/
import BaseAPI from './apis/BaseAPI';
import AuthAPI from './apis/AuthAPI';
import ChatAPI from './apis/ChatAPI';
import MessageAPI from './apis/MessageAPI';

/** Reducers **/
const combinedReducer = combineReducers({
    /* Slices */
    auth: AuthSlice,
    chat: ChatSlice,

    /* APIs */
    [AuthAPI.reducerPath]: AuthAPI.reducer,
    [ChatAPI.reducerPath]: ChatAPI.reducer,
    [MessageAPI.reducerPath]: MessageAPI.reducer,
});

const rootReducer = (state, action) => {
    if (action.type === 'auth/logout') {
        state = undefined
    }
    return combinedReducer(state, action);
}

/** Redux Persist **/
const persistConfig = {
    key: 'root',
    storage: storageSession // Defaults to 'localStorage' for web
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

/** Redux Store **/
export const store = configureStore({
    reducer: persistedReducer,

    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            // https://redux-toolkit.js.org/usage/usage-guide#working-with-non-serializable-data
            serializableCheck: {
                ignoredActions: ['PERSIST', 'REHYDRATE']
            }
        }).concat([
            AuthAPI.middleware,
            ChatAPI.middleware,
            MessageAPI.middleware,
        ]),
});

export const persistor = persistStore(store);