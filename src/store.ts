import { configureStore } from "@reduxjs/toolkit";
import routeReducer from './reducers/routeReducer';


export const store = configureStore({
  reducer: {
    route: routeReducer

  }
});

export type RootState = ReturnType<typeof store.getState>