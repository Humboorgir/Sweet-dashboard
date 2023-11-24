import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type State = {
  message: string | null;
};

const initialState = {
  message: null,
} as State;

export const error = createSlice({
  name: "error",
  initialState,
  reducers: {
    setError: (state, action: PayloadAction<State>) => {
      state.message = action.payload.message;
    },
  },
});

export const { setError } = error.actions;
export default error.reducer;
