import { createAsyncThunk } from '@reduxjs/toolkit'
import { setIsLoading, setToken } from './authSlice'
import { externalLinks } from '../../data/data'
import { isSuccessful } from '../../utils/general'
import { setData } from '../user/userSlice'
import { getAllUsers } from '../user/userThunk'

export const loginAsync = createAsyncThunk<any, any, { rejectValue: string }>(
    'auth/login',
    async ({ email, password }, { rejectWithValue, dispatch }) => {
        try {
            const url = `${externalLinks.backendLink}/auth/login`
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            })

            const jsonResponse = await response.json()
            if ((isSuccessful(jsonResponse.status))) {
                dispatch(setData({
                    contact: jsonResponse.data.contact,
                    email: jsonResponse.data.email,
                    name: jsonResponse.data.name,
                    role: jsonResponse.data.role,
                    id: jsonResponse.data.id
                }))
                dispatch(getAllUsers({}))
                dispatch(setToken(jsonResponse.data.token))
                dispatch(setIsLoading(true))
            }
            return jsonResponse
        } catch (error) {
            return rejectWithValue('An error occurred while logging in.')
        }
    }
)

export const registerAsync = createAsyncThunk<any, any, { rejectValue: string }>(
    'auth/register',
    async (userData, { rejectWithValue }) => {
        try {
            const url = `${externalLinks.backendLink}/auth/signup`
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            })

            const jsonResponse = await response.json()

            if ((isSuccessful(jsonResponse.status))) {
                console.log(jsonResponse)
                return jsonResponse
            } else {
                return rejectWithValue(jsonResponse.message)
            }
        } catch (error) {
            return rejectWithValue('An error occurred during registration.')
        }
    }
)

