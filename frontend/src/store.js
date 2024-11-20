import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from './axios/slices/auth'
import postReducer from './axios/slices/postSlice'
import userReducer from './axios/slices/userSlice'
import notifyReducer from './axios/slices/notificationSlice'


const reducer=combineReducers({
authState:authReducer,
postState:postReducer,
userState:userReducer,
notifyState:notifyReducer
})

const store=configureStore({
    reducer
})

export default store