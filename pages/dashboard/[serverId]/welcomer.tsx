import DashboardLayout from "@/layouts/dashboardLayout";
import SaveChanges from "@/components/dashboard/saveChanges";
import TextArea from "@/components/shared/textarea";
import Switch from "@/components/shared/switch";

import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import {
  setWelcomeMsg,
  setGoodbyeMsg,
  toggleGoodbyeMsgs,
  toggleWelcomeMsgs,
} from "@/redux/features/guildSettings";

import { RiErrorWarningLine as Warning } from "react-icons/ri";

import Head from "next/head";

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

      <div className="py-5 px-8 md:py-8 max-w-[calc(100vw-100px)]">
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
        <p className="text-gradient-soft text-lg mb-2.5">Sent when a new user joins the server.</p>
        <div className="grid place-items-center mb-10 grid-cols-[repeat(5,min-content)]">
          <TextArea
            placeholder="Welcome message"
            onChange={(e) => dispatch(setWelcomeMsg(e.target.value))}
            value={welcomeMsg}
            className="mt-4 col-span-5 bg-neutral-900"
            disabled={!welcomeMsgsEnabled}
          />
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
        <p className="text-gradient-soft text-lg mb-2.5">Sent when a user leaves the server.</p>
        <div className="grid place-items-center grid-cols-[repeat(5,min-content)] max-w-[70vw]">
          <TextArea
            placeholder="Goodbye message"
            onChange={(e) => dispatch(setGoodbyeMsg(e.target.value))}
            value={goodbyeMsg}
            className="mt-4 col-span-5 !bg-neutral-900"
            disabled={!goodbyeMsgsEnabled}
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
