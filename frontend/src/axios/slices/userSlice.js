import { createSlice } from "@reduxjs/toolkit";
import { followAndUnfollow, getUserProfile, SuggestUsers, UpdateUser } from "../actions/userAction";
import toast from "react-hot-toast";


const suggestSlice = createSlice({
    name: "user",
    initialState: {
        loading: false,
        userSuggestions: [],
        error: false,
        errormessage: null,
        user: null,
       
    },
    reducers: {
        clearError(state) {
            state.error = false
            state.errormessage = null
        }
    },
    extraReducers: (build) => {
        build.addCase(SuggestUsers.pending, (state, action) => {
            return {
                ...state,
                loading: true
            }

        }).addCase(SuggestUsers.fulfilled, (state, action) => {
            return {
                ...state,
                loading: false,
                userSuggestions: action.payload.users
            }
        }).addCase(SuggestUsers.rejected, (state, action) => {

            return {
                ...state,
                loading: false,
                error: true,
                errormessage: action.payload
            }
        })//get user profile
            .addCase(getUserProfile.pending, (state, action) => {
                return {
                    ...state,
                    loading: true
                }

            }).addCase(getUserProfile.fulfilled, (state, action) => {
                return {
                    ...state,
                    loading: false,
                    user: action.payload.user
                }
            }).addCase(getUserProfile.rejected, (state, action) => {

                return {
                    ...state,
                    loading: false,
                    error: true,
                    errormessage: action.payload
                }
            })//follow unfollow
            .addCase(followAndUnfollow.pending, (state, action) => {
                return {
                    ...state,
                }

            }).addCase(followAndUnfollow.fulfilled, (state, action) => {
                return {
                    ...state,
                }
            }).addCase(followAndUnfollow.rejected, (state, action) => {

                return {
                    ...state,
                    loading: false,
                    error: true,
                    errormessage: action.payload
                }
            })//update user
            .addCase(UpdateUser.pending, (state, action) => {
                return {
                    ...state,
                    loading: true
                }

            }).addCase(UpdateUser.fulfilled, (state, action) => {
                toast.success("Profile has been updated succesfully")
                return {
                    ...state,
                    loading: false,
                    user: action.payload.user
                }
            }).addCase(UpdateUser.rejected, (state, action) => {

                return {
                    ...state,
                    loading: false,
                    error: true,
                    errormessage: action.payload
                }
            })
    }
})


const { reducer } = suggestSlice
//export const { clearError } = authSlice.actions
export default reducer
