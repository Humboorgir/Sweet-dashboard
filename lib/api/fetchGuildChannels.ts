import axios from "axios";
import useSWR from "swr";

export default function fetchGuildChannels(guildId: any) {
  const url = `/api/guild/${guildId}/channels`;
  const fetcher = (url: string) =>
    axios
      .get<any>(url)
      .then((res) => res.data)
      // filtering data to include text channels only
      .then((res: any) =>
        res
          .filter((channel: any) => channel.type == 0)
          .map((channel: any) => {
            return { name: channel.name, id: channel.id };
          })
      );

  const { data, isLoading, error } = useSWR(
    guildId ? url : null,
    guildId ? fetcher : null
  );
  return { data, isLoading, error };
}
