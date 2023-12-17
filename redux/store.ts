import { configureStore } from "@reduxjs/toolkit";

import guild from "@/redux/features/guild";
import sidebar from "@/redux/features/sidebar";
import userGuilds from "@/redux/features/userGuilds";
import mutualGuilds from "@/redux/features/mutualGuilds";
import guildSettings from "@/redux/features/guildSettings";
import guildChannels from "@/redux/features/guildChannels";
import error from "@/redux/features/error";

export const store = configureStore({
  reducer: { guild, sidebar, userGuilds, mutualGuilds, guildSettings, guildChannels, error },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
