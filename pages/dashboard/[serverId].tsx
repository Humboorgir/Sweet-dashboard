import DashboardLayout from "@/layouts/dashboardLayout";
import TextArea from "@/components/shared/textarea";
import Button from "@/components/shared/button";

import { useState } from "react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

import { RiErrorWarningLine as Warning } from "react-icons/ri";

const Page = () => {
  const [welcomeMsgsEnabled, setWelcomeMsgsEnabled] = useState(false);
  const router = useRouter();
  const mutualGuilds = useSelector((state: RootState) => state.mutualGuilds.data);
  const error = useSelector((state: RootState) => state.error.message);
  if (error) console.log(error);

  const { serverId } = router.query;

  const isGuildInMutualGuilds = mutualGuilds.some((guild) => guild.id == serverId);

  if (!isGuildInMutualGuilds)
    return (
      <div className="p-5 font-bold text-xl flex items-center">
        This server requires setup <Warning className="text-xl ml-2" />
      </div>
    );

  // Main page
  return (
    <div className="p-5 md:p-8 max-w-[calc(100vw-100px)]">
      <h2 className="text-xl text-foreground">Welcome messages</h2>
      <p className="text-foreground-soft text-base mb-2.5">Sent when a new user joins the server.</p>
      <div className="grid place-items-center grid-cols-[repeat(5,min-content)]">
        <input
          onChange={(e) => setWelcomeMsgsEnabled(e.target.checked)}
          type="checkbox"
          className="mb-0.5 mr-1.5 checked:accent-secondary"
        />
        <span className="text-foreground">Enable</span>
        <TextArea placeholder="Welcome message" className="mt-4 col-span-5" disabled={!welcomeMsgsEnabled} />
      </div>

      <Button
        disabled={!welcomeMsgsEnabled}
        className="text-secondary border-secondary hover:bg-secondary/20 mt-5"
        variant="outline">
        Save changes
      </Button>
    </div>
  );
};

Page.getLayout = function getLayout(page: React.ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default Page;
