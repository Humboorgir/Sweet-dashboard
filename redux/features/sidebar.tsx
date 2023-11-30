import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type State = {
  open: boolean;
};

const initialState = {
  open: false,
} as State;

export const sidebar = createSlice({
  name: "sidebarOpen",
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.open = !state.open;
    },
  },
});

export const { toggleSidebar } = sidebar.actions;
export default sidebar.reducer;
