import Server from "@/components/dashboard/server";
import { RootState } from "@/redux/store";
import { TooltipProvider } from "@radix-ui/react-tooltip";
import { useSelector } from "react-redux";

const Sidebar = () => {
  const servers = useSelector((state: RootState) => state.userGuilds.data);
  const loading = !servers.length || servers[0].id == "Loading";
  if (!servers) return <div>Loading</div>;

  return (
    <div className="no-scrollbar bg-black px-auto py-2 fixed z-50 h-screen w-[80px] gap-3 overflow-y-auto pt-3">
      <TooltipProvider>
        {servers.map((server, i) => {
          return <Server key={i} server={server} isLoading={loading} />;
        })}
      </TooltipProvider>
    </div>
  );
};

export default Sidebar;
