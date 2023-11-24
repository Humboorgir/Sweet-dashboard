import { PartialGuild } from "@/types";

import axios from "axios";
import useGuilds from "@/hooks/useGuilds";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setMutualGuilds } from "@/redux/features/mutualGuilds";
import { setError } from "@/redux/features/error";
import { RootState } from "@/redux/store";

const useMutualGuilds = () => {
  const { data: session, status } = useSession();
  const [cache, setCache] = useState<PartialGuild[]>([]);
  const dispatch = useDispatch();
  const userGuilds = useSelector((state: RootState) => state.userGuilds.data);

  useEffect(() => {
    if (!session?.accessToken || !userGuilds.length || userGuilds[0].id == "Loading") return;
    if (cache.length) {
      console.log("[MUTUAL_GUILDS] Using cache");
      dispatch(setMutualGuilds(cache));
      return;
    }
    (async () => {
      try {
        const botGuildsUrl = "/api/botGuilds";

        console.log("[MUTUAL_GUILDS] Fetching data [not using cache]");
        const botGuilds = (await axios.get<PartialGuild[]>(botGuildsUrl)).data;

        // Getting mutual guilds
        const mutualGuilds = userGuilds.filter((guild) =>
          botGuilds.some((botGuild) => botGuild.id === guild.id)
        );

        setCache(mutualGuilds);
        dispatch(setMutualGuilds(mutualGuilds));
      } catch (e) {
        // @ts-ignore
        // axios errors
        if (e.message) dispatch(setError(e.message));
        console.log(e);
      }
    })();
  }, [status, userGuilds]);
};

export default useMutualGuilds;
