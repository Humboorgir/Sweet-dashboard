import { PartialGuild } from "@/types";

import axios from "axios";

import { setGuild } from "@/redux/features/guild";
import { setError } from "@/redux/features/error";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

export default function useGuild(guildId: string) {
  const { data: session, status } = useSession();
  const [cache, setCache] = useState<any>();

  const dispatch = useDispatch();
  useEffect(() => {
    if (!session?.accessToken) return;
    if (cache) {
      console.log(cache);
      console.log("[GUILD] Using cache");
      dispatch(setGuild(cache));
      return;
    }
    const url = `/api/guild/${guildId}`;
    axios
      .get<any>(url, {
        headers: {
          Authorization: `Bearer ${session?.accessToken}`,
        },
      })
      .then((res) => res.data)
      .then((res: any) => {
        console.log("[GUILD] Fetching data [not using cache]");
        const data = {
          name: res.name,
          id: res.id,
          icon: res.icon,
          verification_level: res.verification_level,
          roleCount: res.roles.length,
        };
        dispatch(setGuild(data));
        setCache(data);
      })
      .catch((e) => {
        setError({
          message: e.message,
        });
      });
  }, [status]);
}
