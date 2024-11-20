import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'
const baseUrl = "https://twitter-clone-wc4p.onrender.com"

export const getAllpost = createAsyncThunk("allPost", async function (args, thunkAPI) {

    try {
        const { data } = await axios.get(`${baseUrl}/api/posts/getallposts`, { withCredentials: true })
        return data
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.message)
    }
})

export const getFollowPost = createAsyncThunk("followPost", async function (args, thunkAPI) {

    try {
        const { data } = await axios.get(`${baseUrl}/api/posts/following`, { withCredentials: true })
        return data
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.message)
    }
})

export const deletePost = createAsyncThunk("deletePost", async function (args, thunkAPI) {

    try {
        const { data } = await axios.delete(`${baseUrl}/api/posts/${args}`, { withCredentials: true })
        return data
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.message)
    }
})

export const likeUnlike = createAsyncThunk("likeUnlikePost", async function (args, thunkAPI) {

    try {
        const { data } = await axios.get(`${baseUrl}/api/posts/like/${args}`, { withCredentials: true })
        return data
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.message)
    }
})

export const addPost = createAsyncThunk("addpost", async function (args, thunkAPI) {

    const { text, img } = args

    try {
        const { data } = await axios.post(`${baseUrl}/api/posts/create`, { text, img }, { withCredentials: true })
        return data
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.message)
    }
})

export const GetUserPosts = createAsyncThunk("userpost", async function (args, thunkAPI) {

    try {
        const { data } = await axios.get(`${baseUrl}/api/posts/user/${args}`, { withCredentials: true })
        return data
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.message)
    }
})

export const CommentPost = createAsyncThunk("commentpost", async function (args, thunkAPI) {
    const { id, text } = args
    try {
        const { data } = await axios.post(`${baseUrl}/api/posts/comment/${id}`, { text }, { withCredentials: true })
        return data
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.message)
    }
})

export const GetLikedPosts = createAsyncThunk("getlikedpost", async function (args, thunkAPI) {
    const { id } = args
    try {
        const { data } = await axios.get(`${baseUrl}/api/posts/likes/${id}`, { withCredentials: true })
        return data
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.message)
    }
})

export const DeleteComment=createAsyncThunk('delete comment',async function(args,thunkAPI){
    const { id ,commentId} = args
    try {
        await axios.delete(`${baseUrl}/api/posts/comment/${id}/${commentId}`, { withCredentials: true })
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.message)
    }
})


