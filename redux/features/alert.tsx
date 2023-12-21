import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type State = {
  type: "success" | "error" | "info";
  message: string | null;
};

const initialState = {
  type: "success",
  message: null,
} as State;

export const alert = createSlice({
  name: "alert",
  initialState,
  reducers: {
    setAlert: (state, action: PayloadAction<State>) => {
      state.type = action.payload.type;
      state.message = action.payload.message;
    },
    resetAlert: (state) => {
      state.type = initialState.type;
      state.message = initialState.message;
    },
  },
});

export const { setAlert, resetAlert } = alert.actions;
export default alert.reducer;
