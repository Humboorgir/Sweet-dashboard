import Server from "@/components/dashboard/server";
import useServers from "@/hooks/useServers";

const Sidebar = () => {
  const servers = useServers();
  if (!servers || !servers.data) return <div>Loading servers</div>;

  return (
    <ul className="h-screen bg-black overflow-y-scroll px-3 py-2">
      {servers.data.map((server) => {
        return <Server server={server} isLoading={servers.isLoading} />;
      })}
    </ul>
  );
};

export default Sidebar;
