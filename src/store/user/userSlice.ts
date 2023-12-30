// userSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState = {
    name: '',
    contact: '',
    email: '',
    role:'',
    id:''
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setData: (state, action)=>{
            state.contact= action.payload.contact
            state.email = action.payload.email
            state.name = action.payload.name
            state.role = action.payload.role
            state.id = action.payload.id
        },
        resetUser: (state)=>{
            state.contact= ''
            state.email = ''
            state.name = ''
            state.role = ''
            state.id = ''
        }
    }
})

export default userSlice.reducer

export const { resetUser, setData  } = userSlice.actions
