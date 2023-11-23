import axios from "axios";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";

export default function useServers() {
  const { data: session, status } = useSession();
  const [servers, setServers] = useState([
    // i know this is not the best approach but it does the job for now
    { name: "Loading", id: "Loading", icon: "Loading" },
    { name: "Loading", id: "Loading", icon: "Loading" },
    { name: "Loading", id: "Loading", icon: "Loading" },
    { name: "Loading", id: "Loading", icon: "Loading" },
    { name: "Loading", id: "Loading", icon: "Loading" },
    { name: "Loading", id: "Loading", icon: "Loading" },
  ]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!session?.accessToken) return;
    const url = "https://discord.com/api/users/@me/guilds?scope=guilds";
    axios
      .get(url, {
        headers: {
          Authorization: `Bearer ${session?.accessToken}`,
        },
      })
      .then((res: any) =>
        res.data.filter((guild: any) => (guild.permissions & 0x0000000000000020) == 0x0000000000000020)
      )
      .then((res) => {
        setServers(res);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, [status]);

  return { servers, loading, error, setServers };
}
