import { createAsyncThunk } from '@reduxjs/toolkit'
import { externalLinks } from '../../data/data'
import { isSuccessful } from '../../utils/general'
import { setData } from '../user/userSlice'
import { RootState } from '../store'
import { setUsers } from '../users/usersSlice'
export const addUserAsync = createAsyncThunk<any, any, { rejectValue: string }>(
    'user/addUser',
    async (userData, { rejectWithValue, getState }) => {
        try {
            const url = `${externalLinks.backendLink}/auth/signup`
            const state = getState() as RootState
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': "Bearer " + state.auth.token
                },
                body: JSON.stringify(userData)
            })

            const jsonResponse = await response.json()

            if ((isSuccessful(jsonResponse.status))) {
               return jsonResponse
            } else {
                return rejectWithValue(jsonResponse.message)
            }
        } catch (error) {
            return rejectWithValue('An error occurred while adding user.')
        }
    }
)

export const getAllUsers = createAsyncThunk<any, any, { rejectValue: string }>(
    'users/getAllUsers',
    async (_, { rejectWithValue, getState, dispatch }) => {
        try {
            const url = `${externalLinks.backendLink}/user/get_all`
            const state = getState() as RootState
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': "Bearer " + state.auth.token
                }
            })

            const jsonResponse = await response.json()

            if ((isSuccessful(jsonResponse.status))) {
                dispatch(setUsers(jsonResponse.users))
                return jsonResponse
            } else {
                return rejectWithValue(jsonResponse.message)
            }
        } catch (error) {
            return rejectWithValue('An error occurred while getting users.')
        }
    }
)

export const deleteUser = createAsyncThunk<any, any, { rejectValue: string }>(
    'users/deleteUser',
    async (userId, { rejectWithValue, getState, dispatch }) => {
        try {
            const url = `${externalLinks.backendLink}/user/delete/${userId}`
            const state = getState() as RootState
            const response = await fetch(url, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': "Bearer " + state.auth.token
                }
            })

            const jsonResponse = await response.json()

            if ((isSuccessful(jsonResponse.status))) {
                dispatch(getAllUsers({}))
                return jsonResponse
            } else {
                return rejectWithValue(jsonResponse.message)
            }
        } catch (error) {
            return rejectWithValue('An error occurred while deleting user.')
        }
    }
)

export const updateUser = createAsyncThunk<any, any, { rejectValue: string }>(
    'users/updateUser',
    async (userData, { rejectWithValue, getState, dispatch }) => {
        try {
            const url = `${externalLinks.backendLink}/user/update/${userData.id}`
            const state = getState() as RootState
            const response = await fetch(url, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': "Bearer " + state.auth.token
                },
                body: JSON.stringify(userData)
            })

            const jsonResponse = await response.json()

            if ((isSuccessful(jsonResponse.status))) {
                dispatch(getAllUsers({}))
                return jsonResponse
            } else {
                return rejectWithValue(jsonResponse.message)
            }
        } catch (error) {
            return rejectWithValue('An error occurred while updating user.')
        }
    }
)