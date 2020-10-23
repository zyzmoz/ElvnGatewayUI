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

export const bulkUpdateRoutes = createAsyncThunk('route/bulk-update-routes', async(batch: Array<IRoute>) => {
  const pr = batch.map(async route => {
    console.log(route);
    await axios.post(`${HOST}${route.id}`, route);
  });
  await Promise.all(pr);
  const res = await axios.get(HOST);
  return (res.data as Array<IRoute>);
}) 

export const deleteRoute = createAsyncThunk('route/delete-route', async(id: number) => {
  await axios.delete(`${HOST}${id}`);
  const res = await axios.get(HOST);
  return (res.data as Array<IRoute>);
}) 

export const addNewRoute = createAsyncThunk('route/add-route', async(route: IRoute) => {
  await axios.post(HOST, route);
  const res = await axios.get(HOST);
  return (res.data as Array<IRoute>);
}) 

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

    builder.addCase(bulkUpdateRoutes.rejected, (state, action) => {
      state.error = action.error.message
    });
    builder.addCase(bulkUpdateRoutes.fulfilled, (state, action: PayloadAction<Array<IRoute>>) => {
      state.list = action.payload;
    });
    builder.addCase(deleteRoute.rejected, (state, action) => {
      state.error = action.error.message
    });
    builder.addCase(deleteRoute.fulfilled, (state, action: PayloadAction<Array<IRoute>>) => {
      state.list = action.payload;
    });
    builder.addCase(addNewRoute.rejected, (state, action) => {
      state.error = action.error.message
    });
    builder.addCase(addNewRoute.fulfilled, (state, action: PayloadAction<Array<IRoute>>) => {
      state.list = action.payload;
    });


  }
});

export default routeReducer.reducer;