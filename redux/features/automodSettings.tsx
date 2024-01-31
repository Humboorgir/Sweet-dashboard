import { createSlice, PayloadAction } from "@reduxjs/toolkit";

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
    setDelete: (
      state,
      action: PayloadAction<{
        setting: "inviteBlocker" | "blockBadWords" | "blockLinks" | "antiSpam";
        value: boolean;
      }>
    ) => {
      state[action.payload.setting].delete = action.payload.value;
    },
    setMute: (
      state,
      action: PayloadAction<{
        setting: "inviteBlocker" | "blockBadWords" | "blockLinks" | "antiSpam";
        value: boolean;
      }>
    ) => {
      state[action.payload.setting].mute = action.payload.value;
    },
    setAutomodSettings: (state, action: PayloadAction<State>) => {
      const { payload } = action;
      state.inviteBlocker = {
        enabled: payload.inviteBlocker.enabled,
        delete: payload.inviteBlocker.delete,
        mute: payload.inviteBlocker.mute,
      };
      state.blockBadWords = {
        enabled: payload.blockBadWords.enabled,
        delete: payload.blockBadWords.delete,
        mute: payload.blockBadWords.mute,
      };
      state.blockLinks = {
        enabled: payload.blockLinks.enabled,
        delete: payload.blockLinks.delete,
        mute: payload.blockLinks.mute,
      };
      state.antiSpam = {
        enabled: payload.antiSpam.enabled,
        delete: payload.antiSpam.delete,
        mute: payload.antiSpam.mute,
      };
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
  setDelete,
  setMute,
  setAutomodSettings,
  resetAutomodSettings,
} = automodSettings.actions;
export default automodSettings.reducer;
