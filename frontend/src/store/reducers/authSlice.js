import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
    name: 'Auth',
    initialState: {
        user: null,
        token: null,
    },
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
        },
        setToken: (state, action) => {
            state.token = action.payload;
            console.log(state.token);
        },
    },
});


export const { setUser, setToken } = authSlice.actions;

export default authSlice.reducer;