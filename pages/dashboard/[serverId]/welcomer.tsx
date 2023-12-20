import DashboardLayout from "@/layouts/dashboardLayout";
import SaveChanges from "@/components/dashboard/saveChanges";
import WelcomeMessagesInputs from "@/components/dashboard/welcomer/welcomeMessagesInputs";
import GoodbyeMessagesInputs from "@/components/dashboard/welcomer/goodbyeMessagesInputs";
import Switch from "@/components/shared/switch";

import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { cn } from "@/lib/utils";
import { RootState } from "@/redux/store";
import { toggleGoodbyeMsgs, toggleWelcomeMsgs } from "@/redux/features/guildSettings";

import { RiErrorWarningLine as Warning } from "react-icons/ri";

import Head from "next/head";
import useGuildChannels from "@/hooks/useGuildChannels";

const Page = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const mutualGuilds = useSelector((state: RootState) => state.mutualGuilds.data);
  const error = useSelector((state: RootState) => state.error.message);
  const welcomeMsgsEnabled = useSelector((state: RootState) => state.guildSettings.welcomeMsgsEnabled);
  const goodbyeMsgsEnabled = useSelector((state: RootState) => state.guildSettings.goodbyeMsgsEnabled);
  const goodbyeMsg = useSelector((state: RootState) => state.guildSettings.goodbyeMsg);
  const guild = useSelector((state: RootState) => state.guild);

  if (error) console.log(error);

  const { serverId } = router.query;

  // fetch and load guild channels into the global state
  useGuildChannels(serverId ? String(serverId) : "");

  const isGuildInMutualGuilds = mutualGuilds.some((guild) => guild.id == serverId);

  if (!isGuildInMutualGuilds)
    return (
      <div className="p-5 font-bold text-xl flex items-center">
        This server requires setup <Warning className="text-xl ml-2" />
      </div>
    );

  const title = `${guild.name} - Welcome & Goodbye`;

  return (
    <>
      {/* metadata   */}
      <Head>
        <title>{title}</title>
      </Head>

      {/* page content */}
      <div className="pt-5 pb-28 px-8 md:pt-8 max-w-[100%]">
        {/* fixed element, displayed conditionally  */}
        <SaveChanges />
        {/* Welcome messages ~ text & switch */}
        <div className="flex items-center">
          <h2 className="text-xl md:text-3xl text-gradient font-bold mr-3">Welcome messages</h2>
          <Switch
            id="welcomeMsgsCheckbox"
            checked={welcomeMsgsEnabled}
            onCheckedChange={(checked: boolean) => dispatch(toggleWelcomeMsgs(checked))}
          />
        </div>
        <p className={cn("text-gradient-soft text-lg mb-8", welcomeMsgsEnabled && "mb-1")}>
          Sent when a new user joins the server.
        </p>

        {/* Welcome message and channel input */}
        {welcomeMsgsEnabled && <WelcomeMessagesInputs />}

        {/* Goodbye messages ~ text & switch */}
        <div className="flex items-center">
          <h2 className="text-xl md:text-3xl text-gradient font-bold mr-3">Goodbye messages</h2>
          <Switch
            id="goodbyeMsgsCheckbox"
            checked={goodbyeMsgsEnabled}
            onCheckedChange={(checked: boolean) => dispatch(toggleGoodbyeMsgs(checked))}
          />
        </div>
        <p className="text-gradient-soft text-lg mb-1">Sent when a user leaves the server.</p>
        {/* Goodbye message and channel input  */}
        {goodbyeMsgsEnabled && <GoodbyeMessagesInputs />}
      </div>
    </>
  );
};

Page.getLayout = function getLayout(page: React.ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default Page;
