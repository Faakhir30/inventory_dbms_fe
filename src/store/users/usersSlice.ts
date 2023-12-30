// userSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface User {
    name: '',
    contact: '',
    email: '',
    role:'',
    id:''
}
const initialState: User[] = []
const usersSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUsers: (state, action)=>{
            return action.payload
        },
    }
})

export default usersSlice.reducer

export const { setUsers  } = usersSlice.actions
