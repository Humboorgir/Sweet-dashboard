import Guild from "@/components/dashboard/guild";
import { RootState } from "@/redux/store";
import { TooltipProvider } from "@radix-ui/react-tooltip";
import { useSelector } from "react-redux";

const Guilds = () => {
  const guilds = useSelector((state: RootState) => state.userGuilds.data);
  const loading = !guilds.length || guilds[0].id == "Loading";
  if (!guilds) return <div>Loading</div>;

  return (
    <div className="no-scrollbar px-auto h-screen w-[80px] gap-3 overflow-y-auto">
      <TooltipProvider>
        {guilds.map((guild, i) => {
          return <Guild key={i} guild={guild} isLoading={loading} />;
        })}
      </TooltipProvider>
    </div>
  );
};

export default Guilds;
