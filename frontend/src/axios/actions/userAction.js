import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const baseUrl = "http://localhost:9500"

export const SuggestUsers = createAsyncThunk("suggestUser", async function (args, thunkAPI) {
    try {
        const {data}=await axios.get(`${baseUrl}/api/users/suggesteduser`, { withCredentials: true })
        return data
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.message)
    }
})

export const getUserProfile = createAsyncThunk("userprofile", async function (args, thunkAPI) {
    try {
        const {data}=await axios.get(`${baseUrl}/api/users/profile/${args}`, { withCredentials: true })
        return data
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.message)
    }
})

export const followAndUnfollow=createAsyncThunk('followunfollow',async function(args,thunkAPI){
    try {
        await axios.get(`${baseUrl}/api/users/follow/${args}`,{ withCredentials: true })
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.message)
    }
})

export const UpdateUser=createAsyncThunk('updateuser',async function(args,thunkAPI){
    try {
        const{data}=await axios.put(`${baseUrl}/api/users/update`,args,{ withCredentials: true })
        return data
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.message)
    }
})
