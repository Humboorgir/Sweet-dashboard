import DashboardLayout from "@/layouts/dashboardLayout";
import SaveChanges from "@/components/dashboard/automod/saveChanges";
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
import { setGuild } from "@/redux/features/guild";

import { RiErrorWarningLine as Warning } from "react-icons/ri";

import Head from "next/head";
import fetchGuildInfo from "@/lib/api/fetchGuildInfo";

const Page = () => {
  type ModalValue = "inviteBlocker" | "blockBadWords" | "blockLinks" | "antiSpam";
  type Modal = {
    name: string;
    value: ModalValue;
    open: boolean;
  };

  const [openModal, setOpenModal] = useState<Modal>({ name: "", value: "inviteBlocker", open: false });
  const router = useRouter();
  const dispatch = useDispatch();
  const automodSettings = useSelector((state: RootState) => state.automodSettings);
  const { inviteBlocker, blockBadWords, blockLinks, antiSpam } = automodSettings;

  const { serverId } = router.query;
  const { data: guild, isLoading } = fetchGuildInfo(serverId);
  if (guild) {
    dispatch(setGuild(guild));
  }

  if (!guild)
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
      value: "inviteBlocker",
      description: "Deletes the message if a user is detected to be sending invite links",
      checked: inviteBlocker.enabled,
      onCheckedChange: () => dispatch(toggleInviteBlocker()),
    },
    {
      name: "Block Bad Words",
      value: "blockBadWords",
      description: "Deletes messages that contain configured blacklisted words",
      checked: blockBadWords.enabled,
      onCheckedChange: () => dispatch(toggleBlockBadWords()),
    },
    {
      name: "Block Links",
      value: "blockLinks",
      description: "Deletes messages that contain any link outside discord",
      checked: blockLinks.enabled,
      onCheckedChange: () => dispatch(toggleBlockLinks()),
    },
    {
      name: "Anti Spam",
      value: "antiSpam",
      description: "Deletes messages if they are detected to be spammed",
      checked: antiSpam.enabled,
      onCheckedChange: () => dispatch(toggleAntiSpam()),
    },
  ];

  function openConfigureModal(setting: string, value: ModalValue) {
    setOpenModal({ name: setting, value: value, open: true });
  }

  function closeConfigureModal() {
    setOpenModal((prev) => ({ name: prev.name, value: prev.value, open: false }));
  }

  return (
    <>
      {/* metadata   */}
      <Head>
        <title>{title}</title>
      </Head>

      {/* page content  */}
      <div className="pt-5 px-8 md:pt-8">
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
