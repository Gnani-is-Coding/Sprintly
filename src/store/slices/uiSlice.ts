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
  },
});

export const { toggleSidebar } = uiSlice.actions; // action creators .
export default uiSlice.reducer;
