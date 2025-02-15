import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../axios";

export const getUser = createAsyncThunk(
  "auth/getUser",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get("/auth/profile");
      return res.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(null);
    }
  }
);

export const authSlice = createSlice({
  name: "Auth",
  initialState: {
    user: null,
    loading: true,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.isAuth = true;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getUser.fulfilled, (state, action) => {
      state.user = action.payload;
      state.loading = false;
    });
    builder.addCase(getUser.rejected, (state) => {
      state.user = null;
      state.loading = false;
    });
  },
});

export const { setUser, setToken } = authSlice.actions;

export default authSlice.reducer;
