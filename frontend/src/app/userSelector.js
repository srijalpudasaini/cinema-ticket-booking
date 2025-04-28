import { createSlice } from "@reduxjs/toolkit";
export const userSlice = createSlice({
    name: 'user',
    initialState: null,
    reducers: {
        login(state, action) {
            return action.payload;
        },
        logout(state) {
            return null;
        }
    }
})

export const { login, logout } = userSlice.actions;

export const userReducer = userSlice.reducer;
