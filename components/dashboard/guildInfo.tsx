import type { RootState } from "@/redux/store";

import { useRouter } from "next/router";
import { useSelector } from "react-redux";

import Image from "next/image";
import Button from "@/components/shared/button";

import { FaAngleDown as ArrowDown } from "react-icons/fa";
import { FaHandPaper as Hand } from "react-icons/fa";
import { IoIosSend as Send } from "react-icons/io";
import { FaRobot as Robot } from "react-icons/fa6";

const GuildInfo = () => {
  const router = useRouter();
  const userGuilds = useSelector((state: RootState) => state.userGuilds.data);

  const { serverId } = router.query;

  const guild = userGuilds.filter((guild) => guild.id == serverId)[0];
  if (!serverId || !guild) return null;
  const iconUrl = `https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}`;
  return (
    <div
      className="fixed left-[80px] w-[280px] border-2 border-neutral-800 rounded-3xl min-h-screen
      my-5 py-6 px-3 flex flex-col items-center bg-neutral-700/20">
      <Image
        className="rounded-full mb-3 mx-auto bg-neutral-800"
        src={iconUrl}
        width={90}
        height={90}
        priority
        alt={guild.name}
      />
      <h3 className="text-lg font-bold mb-8">{guild.name}</h3>
      {/* TODO: make a seperate Category component for this */}
      {/* category title  */}
      <h3 className="text-sm tracking-wider text-foreground-soft flex items-center mb-1 mr-auto font-normal">
        <ArrowDown className="text-sm mr-1.5 mb-1" /> Settings
      </h3>
      <div className="min-w-[94%] ml-2">
        <Button variant="ghost" className="flex items-center hover:bg-secondary/10 w-full justify-start">
          <Hand className="text-sm mr-2" /> Welcome & Goodbye
        </Button>
        <Button variant="ghost" className="flex items-center hover:bg-secondary/10 w-full justify-start">
          <Robot className="text-sm mr-2" /> Automod
        </Button>
        <Button variant="ghost" className="flex items-center hover:bg-secondary/10 w-full justify-start">
          <Send className="text-sm mr-2" /> Auto responder
        </Button>
      </div>
    </div>
  );
};

export default GuildInfo;
