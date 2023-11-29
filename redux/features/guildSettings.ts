import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type State = {
  welcomeMsgsEnabled: boolean;
  welcomeMsg: string;
  goodbyeMsgsEnabled: boolean;
  goodbyeMsg: string;
};

const initialState = {
  welcomeMsgsEnabled: false,
  welcomeMsg: "",
  goodbyeMsgsEnabled: false,
  goodbyeMsg: "",
} as State;

export const guildSettings = createSlice({
  name: "guildSettings",
  initialState,
  reducers: {
    toggleWelcomeMsgs: (state, action: PayloadAction<boolean>) => {
      state.welcomeMsgsEnabled = action.payload;
    },
    toggleGoodbyeMsgs: (state, action: PayloadAction<boolean>) => {
      state.goodbyeMsgsEnabled = action.payload;
    },
  },
});

export const { toggleWelcomeMsgs, toggleGoodbyeMsgs } = guildSettings.actions;
export default guildSettings.reducer;
