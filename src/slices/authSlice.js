import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "../services/authService";

// Cookie
import cookie from 'js-cookie'

const user = cookie.get('user') ? JSON.parse(cookie.get('user')) : null
console.log(user)

const initialState = {
    user: user ? user : null,
    error: false,
    success: false,
    loading: false,
}

// Login
export const login = createAsyncThunk("auth/login",
    async (user, thunkAPI) => {
        const data = await authService.login(user)

        // Check for error
        if (data.error) {
            return thunkAPI.rejectWithValue(data.error)
        }

        cookie.set("user", JSON.stringify(data), {
            expires: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000)
        })

        return data
    }
)

// Logout
export const logout = createAsyncThunk("auth/logout",
    async () => {
        await authService.logout()
    }
)

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        reset: (state) => {
            state.loading = false
            state.error = false
            state.success = false
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.loading = true
                state.error = false
            })
            .addCase(login.fulfilled, (state, action) => {
                state.loading = false
                state.success = true
                state.error = null
                state.user = action.payload
            })
            .addCase(login.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
                state.user = null
            })
            .addCase(logout.fulfilled, (state, action) => {
                state.loading = false
                state.success = true
                state.error = null
                state.user = null
            })
    },
})

export const { reset } = authSlice.actions
export default authSlice.reducer