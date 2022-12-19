import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';

const api = "http://localhost:3000/data"; //common api 

// login api
export const login = createAsyncThunk(
    'login',
    async (arg,{rejectWithValue})=>{
        try{
            const data = await axios.post(`${api}/user/login`,{email:arg}) // login api called
            return data;
        }catch(e){
            rejectWithValue(e.response.data);
        }
    }
);

// new user api 
export const newUser = createAsyncThunk(
    'NewUser',
    async(arg,{rejectWithValue}) => {
        try{
            const data = axios.post(`${api}/user/new`,arg) // new user api called
            return data;
        }catch(e){
            rejectWithValue(e.response.data);
        }
    }
);

// update topic api 
export const updateTopic = createAsyncThunk(
    'newTopic',
    async (arg,{rejectWithValue}) => {
        try{
            const data = axios.post(`${api}/topic/updateTopic/${arg.id}`,arg.data); // updateTopic api called
            return data
        }catch(e){
            return rejectWithValue(e.response.data);
        }
    }
)

// new Topic api
export const newTopic = createAsyncThunk(
    'newTopic',
    async (arg,{rejectWithValue}) => {
        try{
            const data = axios.post(`${api}/topic/newTopic/${arg.id}`,arg.data); // newTopic api called
            return data
        }catch(e){
            return rejectWithValue(e.response.data);
        }
    }
)

const userSlice = createSlice({ // user slice
    name:'User', // slice name
    initialState:{ // initial value
        loading: false, // if loading is true progressbar will spin
        Userdata:{}, // contains user data
        error:false, // if any error occurs it gets true
        message:'', // message from server
        Auth:false, // contains user is authenticated or not
        selectedTopic:"" // used in edit button of dashboard to get the Id of selected topic
    },
    reducers:{ // reducer acrions
        setSelectedTopc(state,payload){
            state.selectedTopic = payload.payload;  // sel selected topic data
        },
        setSelectedTopcToNull(state,payload){
            state.selectedTopic = ''; // reseting the selected topic data
        }
    },
    extraReducers:{
        [login.pending]:(state,{payload})=>{
            state.loading = true;
        },
        [login.fulfilled]:(state,{payload})=>{
            state.loading = false;
            if(payload.data.status){
                state.Userdata = payload.data.user;
                state.Auth = true;
            }else{
                state.error = true;
                state.message = payload.data.message;
            }
        },
        [login.failed]:(state,{payload})=>{
            state.loading = false;
            state.error = true;
        },
        [newUser.pending]:(state,{payload})=>{
            state.loading = true;
        },
        [newUser.fulfilled]:(state,{payload})=>{
            state.loading = false;
            if(payload.data.status){
                state.Userdata = payload.data.user;
                state.Auth = true;
            }else{
                state.error = true;
                state.message = payload.data.message;
            }
        },
        [newUser.failed]:(state,{payload})=>{
            state.loading = false;
            state.error = true;
        },
        [newTopic.pending]:(state,{payload})=>{
            state.loading = true;
        },
        [newTopic.fulfilled]:(state,{payload})=>{
            state.loading = false;
            if(payload.data.status){
                state.Userdata = payload.data.user;
                state.Auth = true;
            }else{
                state.error = true;
                state.message = payload.data.message;
            }
        },
        [newTopic.failed]:(state,{payload})=>{
            state.loading = false;
            state.error = true;
        },
        [updateTopic.pending]:(state,{payload})=>{
            state.loading = true;
        },
        [updateTopic.fulfilled]:(state,{payload})=>{
            state.loading = false;
            if(payload.data.status){
                state.Userdata = payload.data.user;
                state.Auth = true;
            }else{
                state.error = true;
                state.message = payload.data.message;
            }
        },
        [updateTopic.failed]:(state,{payload})=>{
            state.loading = false;
            state.error = true;
        },
    }
})

// all exports
export const {setSelectedTopc,setSelectedTopcToNull} =userSlice.actions;
export default userSlice.reducer;