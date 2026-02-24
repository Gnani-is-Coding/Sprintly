import { createSlice } from "@reduxjs/toolkit";

type UiState = {
  isSidebarCollapsed: boolean;
};

const initialState: UiState = {
  isSidebarCollapsed: false,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.isSidebarCollapsed = !state.isSidebarCollapsed;
    },
    closeSidebar: (state) => {
      state.isSidebarCollapsed = false; // direct state updates in here, redux toolkit uses, mimic under the hood.
    },
  },
});

export const { toggleSidebar, closeSidebar } = uiSlice.actions;
export default uiSlice.reducer;
