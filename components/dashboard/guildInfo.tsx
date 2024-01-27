import type { RootState } from "@/redux/store";

import Option from "@/components/dashboard/option";

import { useRouter } from "next/router";
import { useSelector } from "react-redux";

import Image from "next/image";

import { FaAngleDown as ArrowDown } from "react-icons/fa";
import { FaHandPaper as Hand, FaSearch as Magnifier } from "react-icons/fa";
import { IoIosSend as Send } from "react-icons/io";
import { FaRobot as Robot } from "react-icons/fa6";

const GuildInfo = () => {
  const router = useRouter();
  const { serverId } = router.query;

  // TODO: here's how its gonna work:
  // 1- in the automod page, for each automod option component,
  // there will be a few states storing the internal state of the Component,
  // once you click save, it will update the redux state
  // 2- unlike the current system, I'll make it so that
  // each guild settings section (automod, welcomer, ...) gets
  // their own seperate redux reducer, and when you save guild settings,
  // it only saves it for that current section
  // Though I'm not sure how to lazy load redux data
  // because I don't want all guild settings to be loaded at once
  // when I only need one (like automod for instance)

  const guild = useSelector((state: RootState) => state.guild);
  if (!guild || !serverId) return null;

  // page content
  const iconUrl = `https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}`;
  const settingsOptions = [
    { title: "Overview", href: `overview`, icon: <Magnifier /> },
    { title: "Welcomer", href: `welcomer`, icon: <Hand /> },
    { title: "Automod", href: "automod", icon: <Robot /> },
    { title: "Auto responder", href: "autoresponder", icon: <Send /> },
  ];
  return (
    <div
      className="w-[280px] rounded-3xl h-screen overflow-y-auto no-scrollbar
      py-6 px-3 flex flex-col items-center bg-gradient-to-br from-[#4F4A98] to-[#2D2B4B]">
      {/* guild name and icon  */}
      <Image
        className="rounded-full mb-3 mx-auto bg-neutral-800"
        src={iconUrl}
        width={90}
        height={90}
        priority
        alt={guild.name}
      />
      <h3 className="text-lg font-bold mb-8">{guild.name}</h3>

      {/* categories and options  */}

      {/* category title  */}
      <h3
        className="text-sm tracking-wider text-foreground/80 cursor-pointer
      flex items-center mb-1 mr-auto font-normal">
        <ArrowDown className="text-sm mr-1.5 mb-1" /> Settings
      </h3>
      <div className="min-w-[94%] ml-2">
        {settingsOptions.map(({ title, icon, href }, i) => {
          return <Option serverId={serverId as string} href={href} icon={icon} title={title} key={i} />;
        })}
      </div>
    </div>
  );
};

export default GuildInfo;
