import type { FC } from "react";
import type { Server } from "@/types";
import Link from "next/link";

interface Props {
  server: Server;
  isLoading: Boolean;
}

const Server: FC<Props> = ({ server, isLoading }) => {
  const iconUrl = `https://cdn.discordapp.com/icons/${server.id}/${server.icon}`;
  return (
    <li
      className={`relative flex items-center justify-center
    h-14 w-14 my-2 mx-auto hover:bg-primary bg-gray-800 text-white
    hover:rounded-xl rounded-3xl transition-all duration-200 ease-in-out cursor-pointer group
    ${isLoading && "animate-pulse"}`}
      style={{
        backgroundImage: `url(${iconUrl})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}>
      <Link className="absolute left-0 right-0 bottom-0 top-0" href={`/dashboard/${server.id}`}></Link>
      <span
        className="absolute p-2 m-2 min-w-max left-[60px] rounded-md shadow-md bg-zinc-950 
    text-base group-hover:scale-100 opacity-0 group-hover:opacity-100
    transition-all ease-in-out duration-100 scale-0 origin-left">
        {server.name}
      </span>
    </li>
  );
};

export default Server;
