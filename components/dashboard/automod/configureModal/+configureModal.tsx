import Modal from "@/components/shared/modal";

import ButtonGroup from "./buttonGroup";
import AdministratorNotice from "./administratorNotice";
import Title from "./title";
import DeleteMessageBox from "./deleteMessageBox";
import MuteMemberBox from "./muteMemberBox";

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { toggleDelete, toggleMute } from "@/redux/features/automodSettings";

type Props = {
  openModal: {
    name: string;
    value: "inviteBlocker" | "blockBadWords" | "blockLinks" | "antiSpam";
    open: boolean;
  };
  handleClose: React.MouseEventHandler;
};

const ConfigureModal = ({ openModal, handleClose }: Props) => {
  const dispatch = useDispatch();
  const deleteMessage = useSelector((state: RootState) => state.automodSettings[openModal.value].delete);
  const muteMember = useSelector((state: RootState) => state.automodSettings[openModal.value].mute);

  function toggleDeleteMessage() {
    dispatch(toggleDelete(openModal.value));
  }

  function toggleMuteMember() {
    dispatch(toggleMute(openModal.value));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
  }
  return (
    <Modal open={openModal.open} handleClose={handleClose}>
      <form onSubmit={handleSubmit} className="w-full h-full flex flex-col">
        <Title openModal={openModal} />
        <p className="text-foreground-soft mb-0.5 text-sm">Response to violations:</p>
        <DeleteMessageBox deleteMessage={deleteMessage} toggleDeleteMessage={toggleDeleteMessage} />

        <MuteMemberBox muteMember={muteMember} toggleMuteMember={toggleMuteMember} />

        <AdministratorNotice />

        <ButtonGroup handleClose={handleClose} />
      </form>
    </Modal>
  );
};

export default ConfigureModal;
