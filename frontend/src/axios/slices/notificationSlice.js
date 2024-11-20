import { createSlice } from "@reduxjs/toolkit";
import { DeleteNotification, GetNotification } from "../actions/notifiationAction";
import toast from "react-hot-toast";

const notifySlice=createSlice({
    name:"notification",
    initialState:{
        notification:[],
        loading:false,
        error:null,
        errormessage:null,
        count:0
    },
    reducers:{},
    extraReducers:(build)=>{
        build.addCase(GetNotification.pending,(state,action)=>{
               return{
                ...state,
                loading:true
               }
        }).addCase(GetNotification.fulfilled,(state,action)=>{
           return{
             ...state,
            loading:false,
            notification:action.payload.notification,
            count:action.payload.count
           }
        }).addCase(GetNotification.rejected,(state,action)=>{
            return {
                ...state,
                loading: false,
                error: true,
                errormessage: action.payload
            }
        })//delete notification
        .addCase(DeleteNotification.pending,(state,action)=>{
            return{
             ...state,
             loading:true
            }
     }).addCase(DeleteNotification.fulfilled,(state,action)=>{
        toast.success("Notifications deleted succesfully")
        return{
          ...state,
         loading:false
        }
     }).addCase(DeleteNotification.rejected,(state,action)=>{
         return {
             ...state,
             loading: false,
             error: true,
             errormessage: action.payload
         }
     })
    }
})

const { reducer } = notifySlice
export default reducer
