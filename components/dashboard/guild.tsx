import type { FC } from "react";
import type { PartialGuild } from "@/types";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipTrigger } from "@radix-ui/react-tooltip";

interface Props {
  guild: PartialGuild;
  isLoading: Boolean;
}

const Guild: FC<Props> = ({ guild, isLoading }) => {
  const iconUrl = `https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}`;
  return (
    <Tooltip delayDuration={0}>
      <TooltipTrigger asChild>
        <Link
          href={`/dashboard/${guild.id}`}
          className={cn(
            `relative h-[57px] w-[57px] my-2.5 mx-auto flex items-center
      justify-center hover:bg-primary bg-gray-800 hover:rounded-xl 
      rounded-3xl transition-all duration-200 ease-in-out cursor-pointer group`,
            isLoading && "animate-pulse"
          )}
          style={{
            backgroundImage: `url(${iconUrl})`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
          }}></Link>
      </TooltipTrigger>
      <TooltipContent
        side="right"
        sideOffset={15}
        className="rounded-md shadow-md bg-zinc-950 tooltip
      duration-100 origin-left p-2">
        {guild.name}
      </TooltipContent>
    </Tooltip>
  );
};

export default Guild;
