import DashboardLayout from "@/layouts/dashboardLayout";
import InviteBlocker from "@/components/dashboard/automod/inviteBlocker";
import BlockBadWords from "@/components/dashboard/automod/blockBadWords";
import BlockLinks from "@/components/dashboard/automod/blockLinks";
import AntiSpam from "@/components/dashboard/automod/antiSpam";

import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

import { RiErrorWarningLine as Warning } from "react-icons/ri";

import Head from "next/head";

const Page = () => {
  const guild = useSelector((state: RootState) => state.guild);
  const router = useRouter();

  const mutualGuilds = useSelector((state: RootState) => state.mutualGuilds.data);

  const { serverId } = router.query;

  const isGuildInMutualGuilds = mutualGuilds.some((guild) => guild.id == serverId);

  if (!isGuildInMutualGuilds)
    return (
      <div className="p-5 font-bold text-xl flex items-center">
        This server requires setup <Warning className="text-xl ml-2" />
      </div>
    );

  const title = `${guild.name} - Automod`;
  return (
    <>
      {/* metadata   */}
      <Head>
        <title>{title}</title>
      </Head>

      {/* page content  */}
      <div className="py-5 px-8 md:py-8">
        <h2 className="text-3xl text-gradient mb-5">Automod</h2>
        <div className="flex items-center flex-wrap w-full">
          <InviteBlocker />
          <BlockBadWords />
          <BlockLinks />
          <AntiSpam />
        </div>
      </div>
    </>
  );
};

Page.getLayout = function getLayout(page: React.ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default Page;
