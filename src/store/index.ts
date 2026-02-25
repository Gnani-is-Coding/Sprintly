import { configureStore } from "@reduxjs/toolkit";
import uiSlice from "./slices/uiSlice";

const store = configureStore({
  reducer: {
    uiSlice: uiSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;

export default store;
