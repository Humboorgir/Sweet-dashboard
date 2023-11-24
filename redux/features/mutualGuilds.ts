import { PartialGuild } from "@/types";

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type State = {
  data: PartialGuild[];
};

const initialState = {
  data: [],
} as State;

export const mutualGuilds = createSlice({
  name: "mutualGuilds",
  initialState,
  reducers: {
    setMutualGuilds: (state, action: PayloadAction<PartialGuild[]>) => {
      state.data = action.payload;
    },
  },
});

export const { setMutualGuilds } = mutualGuilds.actions;
export default mutualGuilds.reducer;
