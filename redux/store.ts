import { configureStore } from "@reduxjs/toolkit";

import guild from "@/redux/features/guild";
import sidebar from "@/redux/features/sidebar";
import userGuilds from "@/redux/features/userGuilds";
import mutualGuilds from "@/redux/features/mutualGuilds";
import guildSettings from "@/redux/features/guildSettings";
import automodSettings from "@/redux/features/automodSettings";
import guildChannels from "@/redux/features/guildChannels";
import alert from "@/redux/features/alert";

export const store = configureStore({
  reducer: { guild, sidebar, userGuilds, mutualGuilds, guildSettings, automodSettings, guildChannels, alert },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
