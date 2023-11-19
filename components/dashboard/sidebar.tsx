import Server from "@/components/dashboard/server";
import useServers from "@/hooks/useServers";
const Sidebar = () => {
  const { servers, loading, error } = useServers();
  if (!servers) return <div>Loading</div>;

  return (
    <ul className="bg-black px-3 py-2">
      {servers.map((server, i) => {
        return <Server key={i} server={server} isLoading={loading} />;
      })}
    </ul>
  );
};

export default Sidebar;
