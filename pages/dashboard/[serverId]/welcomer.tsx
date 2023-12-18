import DashboardLayout from "@/layouts/dashboardLayout";
import SaveChanges from "@/components/dashboard/saveChanges";
import SelectChannel from "@/components/dashboard/welcomer/selectChannel";
import TextArea from "@/components/shared/textarea";
import Switch from "@/components/shared/switch";

import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { cn } from "@/lib/utils";
import { RootState } from "@/redux/store";
import {
  setWelcomeMsg,
  setGoodbyeMsg,
  toggleGoodbyeMsgs,
  toggleWelcomeMsgs,
} from "@/redux/features/guildSettings";

import { RiErrorWarningLine as Warning } from "react-icons/ri";

import Head from "next/head";
import useGuildChannels from "@/hooks/useGuildChannels";

const Page = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const mutualGuilds = useSelector((state: RootState) => state.mutualGuilds.data);
  const error = useSelector((state: RootState) => state.error.message);
  const welcomeMsgsEnabled = useSelector((state: RootState) => state.guildSettings.welcomeMsgsEnabled);
  const welcomeMsg = useSelector((state: RootState) => state.guildSettings.welcomeMsg);
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

  const variables = [
    { variable: "%user%", description: "Mentions the new member" },
    { variable: "%username%", description: "New member's username" },
    { variable: "%server%", description: "Server name" },
    { variable: "%membercount%", description: "Server membercount" },
  ];
  return (
    <>
      {/* metadata   */}
      <Head>
        <title>{title}</title>
      </Head>

      <div className="py-5 px-8 md:py-8 max-w-[100%]">
        {/* fixed element, displayed conditionally  */}
        <SaveChanges />
        {/* Welcome messages  */}
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

        <div className=""></div>

        {/* text input  */}
        <div className={cn("hidden mb-4", welcomeMsgsEnabled && "flex")}>
          <TextArea
            placeholder="Welcome message"
            onChange={(e) => dispatch(setWelcomeMsg(e.target.value))}
            value={welcomeMsg}
            className="mt-4 col-span-5 bg-neutral-900"
          />
        </div>

        {/* SelectChannel and variables container  */}
        <div className={cn("hidden justify-between px-2 mb-10 flex-wrap max-w-[670px] w-full", welcomeMsgsEnabled && "flex")}>
          {/* variables  */}
          <div className="mb-3 md:mb-0">
            <h3 className="text-gradient">Variables: </h3>
            {variables.map(({ variable, description }) => {
              return (
                <p className="text-gradient-soft">
                  <span className="text-secondary">{variable}</span> {description}
                </p>
              );
            })}
          </div>
          {/* option to select channel  */}
          <div>
            <h3 className="text-gradient mb-0.5">Send to: </h3>
            <SelectChannel />
          </div>
        </div>

        {/* Goodbye messages  */}
        <div className="flex items-center">
          <h2 className="text-xl md:text-3xl text-gradient font-bold mr-3">Goodbye messages</h2>
          <Switch
            id="goodbyeMsgsCheckbox"
            checked={goodbyeMsgsEnabled}
            onCheckedChange={(checked: boolean) => dispatch(toggleGoodbyeMsgs(checked))}
          />
        </div>
        <p className="text-gradient-soft text-lg mb-1">Sent when a user leaves the server.</p>
        <div className={cn("hidden", goodbyeMsgsEnabled && "flex")}>
          <TextArea
            placeholder="Goodbye message"
            onChange={(e) => dispatch(setGoodbyeMsg(e.target.value))}
            value={goodbyeMsg}
            className="mt-4 col-span-5 !bg-neutral-900"
          />
        </div>
      </div>
    </>
  );
};

Page.getLayout = function getLayout(page: React.ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default Page;
