// useGuilds: Fetches and loads user's guilds into the global state.

import { PartialGuild } from "@/types";

import axios from "axios";

import { setUserGuilds } from "@/redux/features/userGuilds";
import { setError } from "@/redux/features/error";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

export default function useGuilds() {
  const { data: session, status } = useSession();
  const [cache, setCache] = useState<PartialGuild[]>([]);
  const dispatch = useDispatch();
  useEffect(() => {
    if (!session?.accessToken) return;
    if (cache.length) {
      console.log("[GUILDS] Using cache");
      dispatch(setUserGuilds(cache));
      return;
    }
    const url = "https://discord.com/api/users/@me/guilds?scope=guilds";
    axios
      .get<PartialGuild[]>(url, {
        headers: {
          Authorization: `Bearer ${session?.accessToken}`,
        },
      })
      .then((res) => {
        const data = res.data.filter(
          (guild) => (Number(guild.permissions) & 0x0000000000000020) == 0x0000000000000020
        );
        console.log("[GUILDS] Fetching data [not using cache]");
        setCache(data);
        return data;
      })
      .then((res) => {
        dispatch(setUserGuilds(res));
      })
      .catch((e) => {
        setError({
          message: e.message,
        });
      });
  }, [status]);
}
