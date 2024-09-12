import DashboardLayout from "@/layouts/dashboardLayout";
import SaveChanges from "@/components/dashboard/welcomer/saveChanges";
import WelcomeMessagesInputs from "@/components/dashboard/welcomer/welcomeMessagesInputs";
import GoodbyeMessagesInputs from "@/components/dashboard/welcomer/goodbyeMessagesInputs";
import Switch from "@/components/shared/switch";

import { cn } from "@/lib/utils";
import guildModel from "@/models/guild";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import {
  setWelcomerSettings,
  toggleWelcome,
  toggleGoodbye,
} from "@/redux/features/welcomerSettings";
import { setGuildChannels } from "@/redux/features/guildChannels";
import { setGuild } from "@/redux/features/guild";
import { setAlert } from "@/redux/features/alert";

import { RiErrorWarningLine as Warning } from "react-icons/ri";

import Head from "next/head";
import fetchGuildChannels from "@/lib/api/fetchGuildChannels";
import fetchGuildInfo from "@/lib/api/fetchGuildInfo";
import mongoConnect from "@/lib/mongoConnect";
import { useEffect } from "react";

const Page = ({
  persistedWelcomerSettings,
}: {
  persistedWelcomerSettings: any;
}) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const welcomeMsgsEnabled = useSelector(
    (state: RootState) => state.welcomerSettings.welcome.enabled
  );
  const goodbyeMsgsEnabled = useSelector(
    (state: RootState) => state.welcomerSettings.goodbye.enabled
  );
  const { serverId } = router.query;

  const { data: guildChannels, error } = fetchGuildChannels(serverId);
  const { data: guild, isLoading } = fetchGuildInfo(serverId);

  useEffect(() => {
    dispatch(setWelcomerSettings(JSON.parse(persistedWelcomerSettings)));
    dispatch(setGuildChannels(guildChannels));
  }, []);

  if (error) {
    dispatch(
      setAlert({ type: "error", message: "Failed to fetch guild channels" })
    );
  }

  if (guild) {
    dispatch(setGuild(guild));
  }

  if (!guild)
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
      <div className="pt-5 pb-48 px-8 md:pt-8 max-w-[100%]">
        {/* fixed element, displayed conditionally  */}
        <SaveChanges
          guildSettingsInitial={JSON.parse(persistedWelcomerSettings)}
        />
        {/* Welcome messages ~ text & switch */}
        <div className="flex items-center">
          <h2 className="text-xl md:text-3xl text-gradient font-bold mr-3">
            Welcome messages
          </h2>
          <Switch
            id="welcomeMsgsCheckbox"
            checked={welcomeMsgsEnabled}
            onCheckedChange={(checked: boolean) =>
              dispatch(toggleWelcome(checked))
            }
          />
        </div>
        <p className="text-gradient-soft text-lg">
          Sent when a new user joins the server.
        </p>

        {/* Welcome message and channel input */}
        <WelcomeMessagesInputs enabled={welcomeMsgsEnabled} />

        {/* Goodbye messages ~ text & switch */}
        <div className="flex items-center mt-7">
          <h2 className="text-xl md:text-3xl text-gradient font-bold mr-3">
            Goodbye messages
          </h2>
          <Switch
            id="goodbyeMsgsCheckbox"
            checked={goodbyeMsgsEnabled}
            onCheckedChange={(checked: boolean) =>
              dispatch(toggleGoodbye(checked))
            }
          />
        </div>
        <p className="text-gradient-soft text-lg mb-1">
          Sent when a user leaves the server.
        </p>
        {/* Goodbye message and channel input  */}
        <GoodbyeMessagesInputs enabled={goodbyeMsgsEnabled} />
      </div>
    </>
  );
};

Page.getLayout = function getLayout(page: React.ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default Page;

export async function getServerSideProps(context: any) {
  mongoConnect();
  const guildSettings = await guildModel.findOne({
    id: context.params.serverId,
  });

  const persistedWelcomerSettings = guildSettings
    ? guildSettings.welcomerSettings
    : null;

  return {
    props: {
      persistedWelcomerSettings: JSON.stringify(persistedWelcomerSettings),
    },
  };
}
