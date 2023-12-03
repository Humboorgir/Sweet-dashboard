import Button from "@/components/shared/button";
import Sidebar from "@/components/dashboard/sidebar";
import GuildInfo from "@/components/dashboard/guildInfo";
import UserInfo from "@/components/dashboard/userInfo";

import useGuild from "@/hooks/useGuild";
import useGuilds from "@/hooks/useGuilds";
import useMutualGuilds from "@/hooks/useMutualGuilds";

import { toggleSidebar } from "@/redux/features/sidebar";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { cn } from "@/lib/utils";

import { FaBarsStaggered as Bars } from "react-icons/fa6";
import { RootState } from "@/redux/store";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const dispatch = useDispatch();
  const sidebarOpen = useSelector((state: RootState) => state.sidebar.open);

  const { serverId } = router.query;
  // load guild data into the global state
  console.log(serverId);
  useGuild(serverId ? String(serverId) : "");
  useGuilds();
  useMutualGuilds();

  return (
    <div className="relative h-screen bg-neutral-900 text-foreground overflow-y-auto">
      <div
        className={cn(
          "fixed z-10 w-[440px] translate-x-[-82%] md:translate-x-0 bg-background md:bg-transparent duration-200 transition-transform",
          sidebarOpen && "translate-x-0"
        )}>
        <div className="relative w-[440px] min-h-screen flex">
          <Button
            variant="ghost"
            rippleColor="#7C72FF"
            onClick={() => dispatch(toggleSidebar())}
            className="text-3xl absolute right-4 top-4 z-10 md:hidden block hover:bg-secondary/10">
            <Bars />
          </Button>
          <Sidebar />
          {/* displayed while viewing server dashboards */}
          <GuildInfo />
          {/* displayed in the home page  */}
          <UserInfo />
        </div>
      </div>
      <div className={cn("absolute left-[80px] md:left-[360px] top-0 right-0 bottom-0")}>{children}</div>
    </div>
  );
}
