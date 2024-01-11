import axios from "axios";
import useSWR from "swr";

export default function fetchGuildInfo(guildId: any) {
  const url = `/api/guild/${guildId}`;
  const fetcher = (url: string) =>
    axios.get<any>(url).then((res) => {
      return {
        name: res.data.name,
        id: res.data.id,
        icon: res.data.icon,
        verification_level: res.data.verification_level,
        roleCount: res.data.roles.length,
      };
    });

  const { data, isLoading, error } = useSWR(guildId ? url : null, guildId ? fetcher : null);
  return { data, isLoading, error };
}
