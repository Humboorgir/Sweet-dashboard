import { PartialGuild } from "@/types";

import axios from "axios";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setMutualGuilds } from "@/redux/features/mutualGuilds";
import { setAlert } from "@/redux/features/alert";
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
      } catch (e: any) {
        if (e.message)
          dispatch(
            setAlert({
              type: "error",
              message: e.message,
            })
          );
      }
    })();
  }, [status, userGuilds]);
};

export default useMutualGuilds;
