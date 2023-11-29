import DashboardLayout from "@/layouts/dashboardLayout";
import TextArea from "@/components/shared/textarea";
import Switch from "@/components/shared/switch";
import Button from "@/components/shared/button";

import { useState } from "react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

import { RiErrorWarningLine as Warning } from "react-icons/ri";

const Page = () => {
  const [welcomeMsgsEnabled, setWelcomeMsgsEnabled] = useState(false);
  const [goodbyeMsgsEnabled, setGoodbyeMsgsEnabled] = useState(false);
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
    <div className="p-5 md:px-8 md:pt-12 max-w-[calc(100vw-100px)]">
      {/* Welcome messages  */}
      <div className="flex items-center">
        <h2 className="text-4xl text-gradient font-bold mr-3">Welcome messages</h2>
        <Switch
          id="welcomeMsgsCheckbox"
          onCheckedChange={(checked: boolean) => setWelcomeMsgsEnabled(checked)}
        />
      </div>
      <p className="text-gradient-soft text-xl mb-2.5">Sent when a new user joins the server.</p>
      <div className="grid place-items-center mb-10 grid-cols-[repeat(5,min-content)]">
        <TextArea placeholder="Welcome message" className="mt-4 col-span-5" disabled={!welcomeMsgsEnabled} />
      </div>

      {/* Goodbye messages  */}
      <div className="flex items-center">
        <h2 className="text-4xl text-gradient font-bold mr-3">Goodbye messages</h2>
        <Switch
          id="goodbyeMsgsCheckbox"
          onCheckedChange={(checked: boolean) => setGoodbyeMsgsEnabled(checked)}
        />
      </div>
      <p className="text-gradient-soft text-xl mb-2.5">Sent when a user leaves the server.</p>
      <div className="grid place-items-center grid-cols-[repeat(5,min-content)]">
        <TextArea placeholder="Goodbye message" className="mt-4 col-span-5" disabled={!goodbyeMsgsEnabled} />
      </div>
      <Button
        disabled={!goodbyeMsgsEnabled}
        className="text-white bg-secondary/80 hover:bg-secondary/60 mt-5"
        rippleColor="#7C72FF"
        variant="default"
        size="lg">
        Save changes
      </Button>
    </div>
  );
};

Page.getLayout = function getLayout(page: React.ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default Page;
