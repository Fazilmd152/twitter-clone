import { createSlice } from "@reduxjs/toolkit";
import { addPost, CommentPost, DeleteComment, deletePost, getAllpost, getFollowPost, GetLikedPosts, GetUserPosts, likeUnlike } from "../actions/postActions";
import toast from "react-hot-toast";



const postSlice = createSlice({
    name: "posts",
    initialState: {
        loading: false,
        error: false,
        errormessage: null,
        posts: [],
        count: 0,
        feedType:"posts",
        postCreated:null,
        deletepost:null,
        commentadded:false
    },
    reducers: {
        clearError(state) {
            state.error = false
            state.errormessage = null
        },
        changeFeedType(state,action) {
            state.feedType =action.payload
        }
    },
    extraReducers: (build) => {
        build//geta all posts
            .addCase(getAllpost.pending, (state, action) => {
                return {
                    ...state,
                    loading: true,

                }

            }).addCase(getAllpost.fulfilled, (state, action) => {
                return {
                    ...state,
                    loading: false,
                    posts: action.payload.posts,
                    count: action.payload.count
                }
            }).addCase(getAllpost.rejected, (state, action) => {
                return {
                    ...state,
                    loading: false,
                    error: true,
                    errormessage: action.payload
                }
            })//get follow posts
            .addCase(getFollowPost.pending, (state, action) => {
                return {
                    ...state,
                    loading: true,

                }

            }).addCase(getFollowPost.fulfilled, (state, action) => {
                return {
                    ...state,
                    loading: false,
                    posts: action.payload.feedPosts,
                    count: action.payload.count,
                }
            }).addCase(getFollowPost.rejected, (state, action) => {
                return {
                    ...state,
                    loading: false,
                    error: true,
                    errormessage: action.payload
                }
            })//delete post
            .addCase(deletePost.pending, (state, action) => {

                return {
                    ...state,deletepost:false
                }
            }).addCase(deletePost.fulfilled, (state, action) => {
                toast.success("Post deleted succesfully")
                return {
                    ...state,
                    message: action.payload.message,deletepost:true
                }
            }).addCase(deletePost.rejected, (state, action) => {
                return {
                    loading: false,
                    ...state,
                    error: true,
                    errormessage: action.payload
                }
            })//like post
            .addCase(likeUnlike.pending, (state, action) => {
                return {
                    ...state,
                }
            }).addCase(likeUnlike.fulfilled, (state, action) => {
                return {
                    ...state,
                    updatedLikes:action.payload.updatedLikes
                }
            }).addCase(likeUnlike.rejected, (state, action) => {
                return {
                    ...state,
                    error: true,
                    errormessage: action.payload
                }
            })//create post
            .addCase(addPost.pending, (state, action) => {
                return {
                    ...state,
                    postCreated:false,
                }
            }).addCase(addPost.fulfilled, (state, action) => {
                toast.success("Post Created succesfully")
                return {
                    ...state,
                    message: action.payload.message,
                    postCreated:true,
                }
            }).addCase(addPost.rejected, (state, action) => {
                return {
                    ...state,
                    error: true,
                    errormessage: action.payload
                }
            })//get user posts
            .addCase(GetUserPosts.pending, (state, action) => {
                return {
                    ...state,
                    
                }
            }).addCase(GetUserPosts.fulfilled, (state, action) => {
                return {
                    ...state,
                   
                    posts: action.payload.usersPosts,
                    count:action.payload.count
                }
            }).addCase(GetUserPosts.rejected, (state, action) => {  
                return {
                    ...state,
                    error: true,
                    errormessage: action.payload
                }
            })//comment post
            .addCase(CommentPost.pending, (state, action) => {
                return {
                    ...state,
                }
            }).addCase(CommentPost.fulfilled, (state, action) => {
                return {
                    ...state,
                    commentadded:!state.commentadded
                }
            }).addCase(CommentPost.rejected, (state, action) => {
                return {
                    ...state,
                    error: true,
                    errormessage: action.payload
                }
            })//getliked posts
            .addCase(GetLikedPosts.pending, (state, action) => {
                return {
                    ...state,
                 
                }
            }).addCase(GetLikedPosts.fulfilled, (state, action) => {
                return {
                    ...state,
                 
                    posts:action.payload.likedPosts
                }
            }).addCase(GetLikedPosts.rejected, (state, action) => {
                return {
                    ...state,
                    error: true,
                    errormessage: action.payload
                }
            })//delete comment
            .addCase(DeleteComment.pending, (state, action) => {
                return {
                    ...state,deletepost:false
                }
            }).addCase(DeleteComment.fulfilled, (state, action) => {
                toast.success("comment has been deleted")
                return {
                    ...state,
                    deletepost:true,
                }
            }).addCase(DeleteComment.rejected, (state, action) => {
                return {
                    ...state,
                    error: true,
                    errormessage: action.payload
                }
            })
    }
})


const { reducer } = postSlice
export const { clearError:clearErrorPost,changeFeedType,like } = postSlice.actions
export default reducer
