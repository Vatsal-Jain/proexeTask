import {createSlice} from '@reduxjs/toolkit'

const initialState = []


const userSlice = createSlice({
    name:'usersList',
    initialState,
    reducers:{
        fetchData(state,action)  {
            state.push(action.payload)
        }
    }
})


export const {fetchData} = userSlice.actions

export default userSlice.reducer