import type { PartialGuild } from "@/types";

import axios from "axios";
import useSWR from "swr";

export default function fetchUserGuilds(session: any) {
  const url = "https://discord.com/api/users/@me/guilds?scope=guilds";
  const fetcher = (url: string) =>
    axios
      .get<PartialGuild[]>(url, {
        headers: {
          Authorization: `Bearer ${session?.accessToken}`,
        },
      })
      .then((res) =>
        res.data.filter((guild) => (Number(guild.permissions) & 0x0000000000000020) == 0x0000000000000020)
      );

  const { data, isLoading, error } = useSWR(session ? url : null, session ? fetcher : null);
  return { data, isLoading, error };
}
