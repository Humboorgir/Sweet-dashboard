import axios from "axios";

import { setGuildChannels } from "@/redux/features/guildChannels";
import { setAlert } from "@/redux/features/alert";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

export default function useGuildChannels(guildId: string) {
  const { data: session, status } = useSession();
  const [cache, setCache] = useState<any>();

  const dispatch = useDispatch();
  useEffect(() => {
    if (!session?.accessToken) return;
    if (cache && cache.id == guildId) {
      console.log(cache);
      console.log("[GUILD_CHANNELS] Using cache");
      dispatch(setGuildChannels(cache));
      return;
    }
    const url = `/api/guild/${guildId}/channels`;
    axios
      .get<any>(url, {
        // I dont know why headers are being sent here but it works
        // and I'm afraid it would stop working if I touch it so...
        headers: {
          Authorization: `Bearer ${session?.accessToken}`,
        },
      })
      .then((res) => res.data)
      .then((res: any) => {
        console.log("[GUILD_CHANNELS] Fetching data [not using cache]");
        // filtering data to include text channels only
        const data = res
          .filter((channel: any) => channel.type == 0)
          .map((channel: any) => {
            return { name: channel.name, id: channel.id };
          });

        dispatch(setGuildChannels(data));
        setCache(data);
      })
      .catch((e) => {
        dispatch(
          setAlert({
            type: "error",
            message: e.message,
          })
        );
      });
  }, [status, guildId]);
}
