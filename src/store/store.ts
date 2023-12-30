import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { persistReducer, persistStore } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // Defaults to localStorage for web
import authReducer from './auth/authSlice'
import userReducer from './user/userSlice'
import usersReducer from './users/usersSlice'
const persistConfig = {
    key: 'root', // Key for storing data in storage
    storage // Storage engine (localStorage or sessionStorage)
    // Add any blacklist or whitelist configuration here if needed
}

const reducer = combineReducers({
    auth:authReducer,
    user:userReducer,
    users:usersReducer
})

const persistedReducer = persistReducer(persistConfig, reducer)

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false
        }),
})

export const persistor = persistStore(store) // Create a persistor object

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch