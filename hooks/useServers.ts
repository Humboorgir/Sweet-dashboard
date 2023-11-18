import useSWR from "swr";
import axios from "axios";
import { useSession } from "next-auth/react";

axios.defaults.withCredentials = true;
axios.defaults.baseURL = process.env.NEXT_PUBLIC_BACKEND_ENDPOINT;

export default async function useServers() {
  const { data: session, status } = useSession();
  if (status != "authenticated") return;

  const fetcher = (url: string) =>
    axios
      .get(url, {
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
        },
      })
      .then((res) => res.data);
  const {
    isLoading,
    error,
    data,
    mutate: mutateData,
  } = useSWR<any>("https://discord.com/api/users/@me/guilds?scope=guilds", fetcher);

  return { isLoading, data, error, mutateData };
}
