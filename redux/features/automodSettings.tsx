import { createSlice } from "@reduxjs/toolkit";

type State = {
  inviteBlocker: {
    enabled: boolean;
    delete: boolean;
    mute: boolean;
  };
  blockBadWords: {
    enabled: boolean;
    delete: boolean;
    mute: boolean;
  };
  blockLinks: {
    enabled: boolean;
    delete: boolean;
    mute: boolean;
  };
  antiSpam: {
    enabled: boolean;
    delete: boolean;
    mute: boolean;
  };
};

export const initialState = {
  inviteBlocker: {
    enabled: false,
    delete: false,
    mute: false,
  },
  blockBadWords: {
    enabled: false,
    delete: false,
    mute: false,
  },
  blockLinks: {
    enabled: false,
    delete: false,
    mute: false,
  },
  antiSpam: {
    enabled: false,
    delete: false,
    mute: false,
  },
} as State;

export const automodSettings = createSlice({
  name: "automodSettings",
  initialState,
  reducers: {
    toggleInviteBlocker: (state) => {
      state.inviteBlocker.enabled = !state.inviteBlocker.enabled;
    },
    toggleBlockBadWords: (state) => {
      state.blockBadWords.enabled = !state.blockBadWords.enabled;
    },
    toggleBlockLinks: (state) => {
      state.blockLinks.enabled = !state.blockLinks.enabled;
    },
    toggleAntiSpam: (state) => {
      state.antiSpam.enabled = !state.antiSpam.enabled;
    },
    resetAutomodSettings: (state) => {
      state.inviteBlocker = {
        enabled: initialState.inviteBlocker.enabled,
        delete: initialState.inviteBlocker.delete,
        mute: initialState.inviteBlocker.mute,
      };
      state.blockBadWords = {
        enabled: initialState.blockBadWords.enabled,
        delete: initialState.blockBadWords.delete,
        mute: initialState.blockBadWords.mute,
      };
      state.blockLinks = {
        enabled: initialState.blockLinks.enabled,
        delete: initialState.blockLinks.delete,
        mute: initialState.blockLinks.mute,
      };
      state.antiSpam = {
        enabled: initialState.antiSpam.enabled,
        delete: initialState.antiSpam.delete,
        mute: initialState.antiSpam.mute,
      };
    },
  },
});

export const {
  toggleInviteBlocker,
  toggleBlockBadWords,
  toggleBlockLinks,
  toggleAntiSpam,
  resetAutomodSettings,
} = automodSettings.actions;
export default automodSettings.reducer;
