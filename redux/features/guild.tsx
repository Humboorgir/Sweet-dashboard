import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type State = {
  name: string;
  id: string;
  icon: string;
  verification_level: number;
  roleCount: number;
};

const initialState = {} as State;

export const guild = createSlice({
  name: "guild",
  initialState,
  reducers: {
    setGuild: (state, action: PayloadAction<State>) => {
      state.name = action.payload.name;
      state.id = action.payload.id;
      state.icon = action.payload.icon;
      state.verification_level = action.payload.verification_level;
      state.roleCount = action.payload.roleCount;
    },
  },
});

export const { setGuild } = guild.actions;
export default guild.reducer;
