import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type Channel = {
  id: string;
  name: string;
};

type State = {
  data: Channel[];
};

const initialState = {
  data: [
    { name: "Loading", id: "Loading" },
    { name: "Loading", id: "Loading" },
    { name: "Loading", id: "Loading" },
  ],
} as State;

export const guildChannels = createSlice({
  name: "guild",
  initialState,
  reducers: {
    setGuildChannels: (state, action: PayloadAction<Channel[]>) => {
      state.data = action.payload;
    },
  },
});

export const { setGuildChannels } = guildChannels.actions;
export default guildChannels.reducer;
