import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { IRoute } from "../models/routeModel";
const HOST = process.env.NODE_ENV === "development"? 'http://localhost:8080/' : window.location.origin;

interface routeState {
  list: Array<IRoute>,
  error?: string
}

const initialState: routeState = {
  list: []
}

export const fetchRoutes = createAsyncThunk('route/fetch-routes', async() => {
  const res = await axios.get(HOST);
  return (res.data as Array<IRoute>);
});


const routeReducer = createSlice({
  name: 'route',
  initialState,
  reducers: {

  },
  extraReducers: builder => {
    builder.addCase(fetchRoutes.rejected, (state, action) => {
      state.error = action.error.message;
    });

    builder.addCase(fetchRoutes.fulfilled, (state, action: PayloadAction<Array<IRoute>> ) => {
      state.list = action.payload
    });

  }
});

export default routeReducer.reducer;