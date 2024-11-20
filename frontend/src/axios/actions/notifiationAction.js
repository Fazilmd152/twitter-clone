import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'
const baseUrl = "https://twitter-clone-wc4p.onrender.com"

export const GetNotification = createAsyncThunk("notify", async function (args, thunkAPI) {

    try {
        const { data } = await axios.get(`${baseUrl}/api/notifications/`,{ withCredentials: true })
        return data
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.message)
    }
})

export const DeleteNotification = createAsyncThunk("deletenotify", async function (args, thunkAPI) {

    try {
         await axios.delete(`${baseUrl}/api/notifications/`, { withCredentials: true })
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.message)
    }
})