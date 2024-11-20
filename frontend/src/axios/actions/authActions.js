import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'
const baseUrl = "http://localhost:9500"

export const signUp = createAsyncThunk("signup", async function (args, thunkAPI) {

    try {
        const { data } = await axios.post(`${baseUrl}/api/auth/signup`, args, { withCredentials: true })
        return data
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.message)
    }
})

export const login = createAsyncThunk("login", async function (args, thunkAPI) {
    try {
        const { data } = await axios.post(`${baseUrl}/api/auth/login`, args, { withCredentials: true })
        return data
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.message)
    }
})

export const logout = createAsyncThunk("logout", async function (args, thunkAPI) {
    try {
        await axios.get(`${baseUrl}/api/auth/logout`,{withCredentials:true})
       
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.message)
    }
})

export const loadUser = createAsyncThunk("getme", async function (args, thunkAPI) {
    try {
        const { data } =  await axios.get(`${baseUrl}/api/auth/getme`,{withCredentials:true})
        return data
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.message)
    }
})


