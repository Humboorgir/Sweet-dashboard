import Sidebar from "@/components/dashboard/sidebar";
import GuildInfo from "@/components/dashboard/guildInfo";

import useGuilds from "@/hooks/useGuilds";
import useMutualGuilds from "@/hooks/useMutualGuilds";

import { useRouter } from "next/router";
import { cn } from "@/lib/utils";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { serverId } = router.query;
  // load guild data into the global state
  useGuilds();
  useMutualGuilds();
  return (
    <div className="relative min-h-screen bg-background text-foreground">
      <Sidebar />
      {/* displayed only if the user's viewing a server's dashboard */}
      <GuildInfo />
      <div className={cn("absolute left-[80px] top-0 right-0 bottom-0", serverId && "left-[360px]")}>
        {children}
      </div>
    </div>
  );
}
