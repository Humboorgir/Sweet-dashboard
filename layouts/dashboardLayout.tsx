import Navbar from "@/components/dashboard/navbar";
import Guilds from "@/components/dashboard/guilds";
import GuildInfo from "@/components/dashboard/guildInfo";
import UserInfo from "@/components/dashboard/userInfo";

import useGuild from "@/hooks/useGuild";
import useGuilds from "@/hooks/useGuilds";
import useMutualGuilds from "@/hooks/useMutualGuilds";

import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import { cn } from "@/lib/utils";

import { RootState } from "@/redux/store";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const sidebarOpen = useSelector((state: RootState) => state.sidebar.open);

  const { serverId } = router.query;
  // load guild data into the global state
  useGuild(serverId ? String(serverId) : "");
  useGuilds();
  useMutualGuilds();

  return (
    <div className="relative min-h-screen bg-background text-foreground">
      <Navbar />
      <div className="flex min-w-screen">
        {/* sidebar (hidden by default on small screens) */}
        <div
          className={cn(
            `fixed md:sticky z-50 md:z-20 w-fit -translate-x-full md:translate-x-0 bg-background
           md:bg-transparent duration-200 transition-transform`,
            sidebarOpen && "translate-x-0"
          )}>
          <div className="relative w-fit min-h-screen flex">
            <Guilds />
            {/* displayed while viewing server dashboards */}
            <GuildInfo />
            {/* displayed in the home page  */}
            <UserInfo />
          </div>
        </div>
        {/* sidebar end  */}

        <div className={cn("min-h-[calc(100vh-52px)] bg-neutral-900 grow")}>{children}</div>
      </div>
    </div>
  );
}
