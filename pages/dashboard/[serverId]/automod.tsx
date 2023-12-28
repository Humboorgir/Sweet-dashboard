import DashboardLayout from "@/layouts/dashboardLayout";
import SaveChanges from "@/components/dashboard/saveChanges";
import Settings from "@/components/dashboard/automod/settings";
import ConfigureModal from "@/components/dashboard/automod/configureModal";

import { useState } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "@/redux/store";
import {
  toggleAntiSpam,
  toggleBlockBadWords,
  toggleBlockLinks,
  toggleInviteBlocker,
} from "@/redux/features/automodSettings";

import { RiErrorWarningLine as Warning } from "react-icons/ri";

import Head from "next/head";

const Page = () => {
  type Modal = {
    name: string;
    open: boolean;
  };

  const [openModal, setOpenModal] = useState<Modal>({ name: "", open: false });
  const router = useRouter();
  const dispatch = useDispatch();

  const guild = useSelector((state: RootState) => state.guild);
  const mutualGuilds = useSelector((state: RootState) => state.mutualGuilds.data);
  const automodSettings = useSelector((state: RootState) => state.automodSettings);

  const { inviteBlocker, blockBadWords, blockLinks, antiSpam } = automodSettings;
  const { serverId } = router.query;

  const isGuildInMutualGuilds = mutualGuilds.some((guild) => guild.id == serverId);
  if (!isGuildInMutualGuilds)
    return (
      <div className="p-5 font-bold text-xl flex items-center">
        This server requires setup <Warning className="text-xl ml-2" />
      </div>
    );

  // page content
  const title = `${guild.name} - Automod`;
  const settings = [
    {
      name: "Invite Blocker",
      description: "Deletes the message if a user is detected to be sending invite links",
      checked: inviteBlocker.enabled,
      onCheckedChange: () => dispatch(toggleInviteBlocker()),
    },
    {
      name: "Block Bad Words",
      description: "Deletes messages that contain configured blacklisted words",
      checked: blockBadWords.enabled,
      onCheckedChange: () => dispatch(toggleBlockBadWords()),
    },
    {
      name: "Block Links",
      description: "Deletes messages that contain any link outside discord",
      checked: blockLinks.enabled,
      onCheckedChange: () => dispatch(toggleBlockLinks()),
    },
    {
      name: "Anti Spam",
      description: "Deletes messages if they are detected to be spammed",
      checked: antiSpam.enabled,
      onCheckedChange: () => dispatch(toggleAntiSpam()),
    },
  ];

  function openConfigureModal(setting: string) {
    setOpenModal({ name: setting, open: true });
  }

  function closeConfigureModal() {
    setOpenModal((prev) => ({ name: prev.name, open: false }));
  }

  return (
    <>
      {/* metadata   */}
      <Head>
        <title>{title}</title>
      </Head>

      {/* page content  */}
      <div className="py-5 px-8 md:py-8">
        {/* fixed element, displayed conditionally  */}
        <SaveChanges />
        <h2 className="text-3xl text-gradient mb-5">Automod</h2>
        <Settings settings={settings} openConfigureModal={openConfigureModal} />
      </div>

      {/* modal(s) */}
      <ConfigureModal openModal={openModal} handleClose={closeConfigureModal} />
    </>
  );
};

Page.getLayout = function getLayout(page: React.ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default Page;
