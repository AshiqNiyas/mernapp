import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const registerUser = createAsyncThunk("auth/register", async (data) => {
  const res = await axios.post(
    `${import.meta.env.VITE_API_URL}/auth/register`,
    data,
  );
  return res.data;
});

export const loginUser = createAsyncThunk("auth/login", async (data) => {
  const res = await axios.post(
    `${import.meta.env.VITE_API_URL}/auth/login`,
    data,
  );
  return res.data;
});

const userFromStorage = JSON.parse(localStorage.getItem("user"));
const initialState = {
  token: localStorage.getItem("token") || null,
  user: userFromStorage || null,
  loading: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.token = null;
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        alert(action.payload.message);
        state.pending = false;
      })
      .addCase(registerUser.rejected, (state) => {
        state.pending = false;
      })
      .addCase(loginUser.pending, (state) => {
        state.pending = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.token = action.payload;
        localStorage.setItem("token", action.payload);
        state.loading = false;
        alert("Logged in");
      })
      .addCase(loginUser.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
