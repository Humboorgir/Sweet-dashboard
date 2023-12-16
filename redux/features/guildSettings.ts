import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type Channel = {
  title: string;
  value: string;
};

type State = {
  welcomeMsgsEnabled: boolean;
  welcomeMsg: string;
  welcomeChannel: Channel;
  goodbyeMsgsEnabled: boolean;
  goodbyeMsg: string;
  goodbyeChannel: Channel;
};

const initialState = {
  welcomeMsgsEnabled: false,
  welcomeMsg: "",
  welcomeChannel: { title: "", value: "" },
  goodbyeMsgsEnabled: false,
  goodbyeMsg: "",
  goodbyeChannel: { title: "", value: "" },
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
    setWelcomeMsg: (state, action: PayloadAction<string>) => {
      state.welcomeMsg = action.payload;
    },
    setGoodbyeMsg: (state, action: PayloadAction<string>) => {
      state.goodbyeMsg = action.payload;
    },
    setWelcomeChannel: (state, action: PayloadAction<Channel>) => {
      state.welcomeChannel = action.payload;
    },
    setGoodbyeChannel: (state, action: PayloadAction<Channel>) => {
      state.goodbyeChannel = action.payload;
    },
    resetSettings: (state) => {
      state.welcomeMsgsEnabled = false;
      state.welcomeMsg = "";
      state.welcomeChannel = { title: "", value: "" };
      state.goodbyeMsgsEnabled = false;
      state.goodbyeMsg = "";
      state.goodbyeChannel = { title: "", value: "" };
    },
  },
});

export const {
  toggleWelcomeMsgs,
  toggleGoodbyeMsgs,
  setWelcomeMsg,
  setGoodbyeMsg,
  resetSettings,
  setWelcomeChannel,
  setGoodbyeChannel,
} = guildSettings.actions;
export default guildSettings.reducer;
