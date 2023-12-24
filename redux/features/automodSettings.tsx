import { createSlice } from "@reduxjs/toolkit";

type Action = "delete" | "mute";

type State = {
  inviteBlocker: {
    enabled: boolean;
    action: Action;
  };
  blockBadWords: {
    enabled: boolean;
    action: Action;
  };
  blockLinks: {
    enabled: boolean;
    action: Action;
  };
  antiSpam: {
    enabled: boolean;
    action: Action;
  };
};

export const initialState = {
  inviteBlocker: {
    enabled: false,
    action: "delete",
  },
  blockBadWords: {
    enabled: false,
    action: "delete",
  },
  blockLinks: {
    enabled: false,
    action: "delete",
  },
  antiSpam: {
    enabled: false,
    action: "delete",
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
        action: initialState.inviteBlocker.action,
      };
      state.blockBadWords = {
        enabled: initialState.blockBadWords.enabled,
        action: initialState.blockBadWords.action,
      };
      state.blockLinks = {
        enabled: initialState.blockLinks.enabled,
        action: initialState.blockLinks.action,
      };
      state.antiSpam = {
        enabled: initialState.antiSpam.enabled,
        action: initialState.antiSpam.action,
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
