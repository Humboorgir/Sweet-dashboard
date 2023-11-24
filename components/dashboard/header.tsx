import type { RootState } from "@/redux/store";

import { useRouter } from "next/router";
import { useSelector } from "react-redux";

const Header = () => {
  const router = useRouter();
  const userGuilds = useSelector((state: RootState) => state.userGuilds.data);

  const { serverId } = router.query;

  const guild = userGuilds.filter((guild) => guild.id == serverId)[0];

  return (
    <div className="flex items-center w-full h-[52px] border-b-2 border-b-neutral-800 px-4 text-lg md:text-xl ">
      {guild?.name ? guild?.name : "Dashboard"}
    </div>
  );
};

export default Header;
