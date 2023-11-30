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
    resetSettings: (state) => {
      state.welcomeMsgsEnabled = false;
      state.welcomeMsg = "";
      state.goodbyeMsgsEnabled = false;
      state.goodbyeMsg = "";
    },
  },
});

export const { toggleWelcomeMsgs, toggleGoodbyeMsgs, resetSettings } = guildSettings.actions;
export default guildSettings.reducer;
