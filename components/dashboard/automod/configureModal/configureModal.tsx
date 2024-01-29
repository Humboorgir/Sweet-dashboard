import Modal from "@/components/shared/modal";

import ButtonGroup from "./buttonGroup";
import AdministratorNotice from "./administratorNotice";
import Title from "./title";
import DeleteMessageBox from "./deleteMessageBox";
import MuteMemberBox from "./muteMemberBox";

import { RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { setDelete, setMute } from "@/redux/features/automodSettings";
import { useEffect, useState } from "react";

type Props = {
  openModal: {
    name: string;
    value: "inviteBlocker" | "blockBadWords" | "blockLinks" | "antiSpam";
    open: boolean;
  };
  handleClose: Function;
};

const ConfigureModal = ({ openModal, handleClose }: Props) => {
  const dispatch = useDispatch();

  // global state

  // prettier-ignore
  const deleteMessageRedux = useSelector((state: RootState) => state.automodSettings[openModal.value].delete);
  const muteMemberRedux = useSelector((state: RootState) => state.automodSettings[openModal.value].mute);

  const initialState = {
    inviteBlocker: false,
    blockLinks: false,
    antiSpam: false,
    blockBadWords: false,
  };

  // local state (reset when modal is closed)
  const [deleteMessage, setDeleteMessage] = useState(initialState);
  const [muteMember, setMuteMember] = useState(initialState);

  // reset local state to global state values when modal is closed
  useEffect(() => {
    setDeleteMessage((prev) => {
      return { ...prev, [openModal.value]: deleteMessageRedux };
    });
    setMuteMember((prev) => {
      return { ...prev, [openModal.value]: muteMemberRedux };
    });
  }, [openModal.open]);

  function toggleDeleteMessage() {
    setDeleteMessage((prev) => {
      return { ...prev, [openModal.value]: !prev[openModal.value] };
    });
  }

  function toggleMuteMember() {
    setMuteMember((prev) => {
      return { ...prev, [openModal.value]: !prev[openModal.value] };
    });
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    dispatch(setDelete({ setting: openModal.value, value: deleteMessage[openModal.value] }));
    dispatch(setMute({ setting: openModal.value, value: muteMember[openModal.value] }));

    handleClose();
  }

  return (
    <Modal open={openModal.open} handleClose={() => handleClose()}>
      <form onSubmit={handleSubmit} className="w-full h-full flex flex-col">
        <Title openModal={openModal} />
        <p className="text-foreground-soft mb-0.5 text-sm">Response to violations:</p>
        <DeleteMessageBox
          deleteMessage={deleteMessage[openModal.value]}
          toggleDeleteMessage={toggleDeleteMessage}
        />

        <MuteMemberBox muteMember={muteMember[openModal.value]} toggleMuteMember={toggleMuteMember} />

        <AdministratorNotice />

        <ButtonGroup handleClose={() => handleClose()} />
      </form>
    </Modal>
  );
};

export default ConfigureModal;
