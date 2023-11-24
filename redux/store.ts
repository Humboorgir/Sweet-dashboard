import { configureStore } from "@reduxjs/toolkit";

import userGuilds from "@/redux/features/userGuilds";
import mutualGuilds from "@/redux/features/mutualGuilds";
import error from "@/redux/features/error";

export const store = configureStore({
  reducer: { userGuilds, mutualGuilds, error },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
