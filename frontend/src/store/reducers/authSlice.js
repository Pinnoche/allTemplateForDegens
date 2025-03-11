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
    isAuth: false,
    loading: true,
  },
  reducers: {
    setLogout: (state) => {
      state.user = null;
      state.isAuth = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getUser.fulfilled, (state, action) => {
      if (action.payload) {
        state.user = action.payload;
        state.isAuth = true;
      }
      state.loading = false;
    });
    builder.addCase(getUser.rejected, (state) => {
      state.user = null;
      state.loading = false;
    });
  },
});

export const { setLogout } = authSlice.actions;

export default authSlice.reducer;
