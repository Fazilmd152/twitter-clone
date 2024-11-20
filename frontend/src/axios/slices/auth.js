import { createSlice } from "@reduxjs/toolkit";
import { login, signUp, logout,loadUser } from "../actions/authActions";
import toast from "react-hot-toast";

const authSlice = createSlice({
    name: "auth",
    initialState: {
        loading: false,
        isAuthenticated: false,
        error: false,
        errormessage: null,
        user: null
    },
    reducers: {
        clearError(state) {
            state.error = false
            state.errormessage = null
        }
    },
    extraReducers: (build) => {
        build//signUp
            .addCase(signUp.pending, (state, action) => {
                return {
                    ...state,
                    loading: true
                }

            }).addCase(signUp.fulfilled, (state, action) => {
                toast.success("user created succesfully")
                return {
                    ...state,
                    isAuthenticated: true,
                    loading: false,
                    user: action.payload.user
                }
            }).addCase(signUp.rejected, (state, action) => {
                return {
                    ...state,
                    loading: false,
                    error: true,
                    errormessage: action.payload
                }
            })//login
            .addCase(login.pending, (state, action) => {
                return {
                    ...state,
                    loading: true
                }

            }).addCase(login.fulfilled, (state, action) => {
                toast.success("Logged in successfully")
                return {
                    ...state,
                    isAuthenticated: true,
                    loading: false,
                    user: action.payload.user
                }
            }).addCase(login.rejected, (state, action) => {

                return {
                    ...state,
                    loading: false,
                    error: true,
                    errormessage: action.payload
                }
            })//logout
            .addCase(logout.pending, (state, action) => {
                return {
                    ...state,
                    loading: true,
                }

            }).addCase(logout.fulfilled, (state, action) => {
                toast.success("Logged out successfully")
                return {
                    ...state,
                    isAuthenticated: false,
                    loading: false,
                    user:null
                }
            }).addCase(logout.rejected, (state, action) => {
                return {
                    ...state,
                    loading: false,
                    error:true,
                    errormeassage: action.payload
                }
            })//load user
            .addCase(loadUser.pending, (state, action) => {
                return {
                    ...state,
                    loading: true
                }

            }).addCase(loadUser.fulfilled, (state, action) => {
                return {
                    ...state,
                    isAuthenticated: true,
                    loading: false,
                    user: action.payload.user
                }
            }).addCase(loadUser.rejected, (state, action) => {
                return {
                    ...state,
                    loading: false,
                    isAuthenticated: false,
                    }
            })
    }
})


const { reducer } = authSlice
export const { clearError } = authSlice.actions
export default reducer
