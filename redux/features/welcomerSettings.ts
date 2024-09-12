import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type State = {
  welcome: {
    enabled: boolean;
    channelId: string;
    message: string;
  };
  goodbye: {
    enabled: boolean;
    channelId: string;
    message: string;
  };
};

export const initialState = {
  welcome: {
    enabled: false,
    channelId: "",
    message: "",
  },
  goodbye: {
    enabled: false,
    channelId: "",
    message: "",
  },
} as State;

export const welcomerSettings = createSlice({
  name: "welcomerSettings",
  initialState,
  reducers: {
    toggleWelcome: (state, action: PayloadAction<boolean>) => {
      state.welcome.enabled = action.payload;
    },
    toggleGoodbye: (state, action: PayloadAction<boolean>) => {
      state.goodbye.enabled = action.payload;
    },
    setWelcomeMsg: (state, action: PayloadAction<string>) => {
      state.welcome.message = action.payload;
    },
    setGoodbyeMsg: (state, action: PayloadAction<string>) => {
      state.goodbye.message = action.payload;
    },
    setWelcomeChannel: (state, action: PayloadAction<string>) => {
      state.welcome.channelId = action.payload;
    },
    setGoodbyeChannel: (state, action: PayloadAction<string>) => {
      state.goodbye.channelId = action.payload;
    },
    setWelcomerSettings: (state, action: PayloadAction<any>) => {
      // TODO: implement this with cleaner syntax
      const { welcome, goodbye } = action.payload;

      state.welcome.enabled = welcome.enabled;
      state.welcome.message = welcome.message;
      state.welcome.channelId = welcome.channelId;
      state.goodbye.enabled = goodbye.enabled;
      state.goodbye.message = goodbye.message;
      state.goodbye.channelId = goodbye.channelId;
    },
    resetSettings: (state) => {
      state.welcome.enabled = false;
      state.welcome.message = "";
      state.welcome.channelId = "";
      state.goodbye.enabled = false;
      state.goodbye.message = "";
      state.goodbye.channelId = "";
    },
  },
});

export const {
  toggleWelcome,
  toggleGoodbye,
  setWelcomeMsg,
  setGoodbyeMsg,
  resetSettings,
  setWelcomeChannel,
  setGoodbyeChannel,
  setWelcomerSettings,
} = welcomerSettings.actions;
export default welcomerSettings.reducer;
