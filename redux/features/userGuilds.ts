import { PartialGuild } from "@/types";

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type State = {
  data: PartialGuild[];
};

const initialState = {
  data: [
    { name: "Loading", id: "Loading", icon: "Loading", owner: false, features: [], permissions: "0" },
    { name: "Loading", id: "Loading", icon: "Loading", owner: false, features: [], permissions: "0" },
    { name: "Loading", id: "Loading", icon: "Loading", owner: false, features: [], permissions: "0" },
    { name: "Loading", id: "Loading", icon: "Loading", owner: false, features: [], permissions: "0" },
    { name: "Loading", id: "Loading", icon: "Loading", owner: false, features: [], permissions: "0" },
    { name: "Loading", id: "Loading", icon: "Loading", owner: false, features: [], permissions: "0" },
  ],
} as State;

export const userGuilds = createSlice({
  name: "userGuilds",
  initialState,
  reducers: {
    setUserGuilds: (state, action: PayloadAction<PartialGuild[]>) => {
      state.data = action.payload;
    },
  },
});

export const { setUserGuilds } = userGuilds.actions;
export default userGuilds.reducer;
