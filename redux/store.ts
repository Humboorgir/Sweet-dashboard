import { configureStore } from "@reduxjs/toolkit";

import userGuilds from "@/redux/features/userGuilds";
import mutualGuilds from "@/redux/features/mutualGuilds";
import guildSettings from "@/redux/features/guildSettings";
import error from "@/redux/features/error";

export const store = configureStore({
  reducer: { userGuilds, mutualGuilds, guildSettings, error },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
