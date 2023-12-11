// similar to guildInfo but for users

import type { RootState } from "@/redux/store";

import Button from "@/components/shared/button";

import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { useSession } from "next-auth/react";

import { FaAngleDown as ArrowDown } from "react-icons/fa";
import { FaHandPaper as Hand } from "react-icons/fa";
import { IoIosSend as Send } from "react-icons/io";
import { FaRobot as Robot } from "react-icons/fa6";

import Image from "next/image";

const UserInfo = () => {
  const { data: session, status } = useSession();

  const router = useRouter();
  const userGuilds = useSelector((state: RootState) => state.userGuilds.data);

  const { serverId } = router.query;

  const guild = userGuilds.filter((guild) => guild.id == serverId)[0];
  if (serverId || guild) return null;

  const iconUrl = session?.user.image ? session?.user.image : "";
  return (
    <div
      className="w-[280px] h-screen overflow-y-scroll rounded-3xl
      py-6 px-3 flex flex-col items-center bg-gradient-to-br from-secondary/60 to-secondary/30">
      <Image
        className="rounded-full mb-3 mx-auto bg-neutral-800"
        src={iconUrl}
        width={90}
        height={90}
        priority
        alt={session?.user.name ? session?.user.name : ""}
      />
      <h3 className="text-lg font-bold mb-8">{session?.user.name}</h3>
      <h3 className="text-sm tracking-wider text-foreground/70 flex items-center mb-1 mr-auto font-normal">
        <ArrowDown className="text-sm mr-1.5 mb-1" /> Settings
      </h3>
      <div className="min-w-[94%] ml-2">
        {[
          { title: "Welcome & Goodbye", icon: <Hand /> },
          { title: "Automod", icon: <Robot /> },
          { title: "Auto responder", icon: <Send /> },
        ].map(({ title, icon }, i) => {
          return (
            <Button
              key={i}
              variant="ghost"
              rippleColor="transparent"
              className="flex items-center hover:bg-secondary/30 w-full justify-start cursor-not-allowed
        bg-gradient-to-br from-foreground to-foreground/50 bg-clip-text text-transparent">
              <span className="text-base mr-2 text-foreground/80">{icon}</span> {title}
            </Button>
          );
        })}
      </div>
    </div>
  );
};

export default UserInfo;
