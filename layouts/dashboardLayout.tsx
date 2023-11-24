import Sidebar from "@/components/dashboard/sidebar";
import Header from "@/components/dashboard/header";

import useGuilds from "@/hooks/useGuilds";
import useMutualGuilds from "@/hooks/useMutualGuilds";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  // load guild data into the global state
  useGuilds();
  useMutualGuilds();
  return (
    <div className="relative min-h-screen bg-background text-foreground">
      <Sidebar />
      <div className="absolute left-[80px] top-0 right-0 bottom-0">
        <Header />
        {children}
      </div>
    </div>
  );
}
