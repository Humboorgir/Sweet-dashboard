import Modal from "@/components/shared/modal";

import ButtonGroup from "./buttonGroup";
import AdministratorNotice from "./administratorNotice";
import Title from "./title";
import DeleteMessageBox from "./deleteMessageBox";
import MuteMemberBox from "./muteMemberBox";

type Props = {
  openModal: { name: string; open: boolean };
  handleClose: React.MouseEventHandler;
};

const ConfigureModal = ({ openModal, handleClose }: Props) => {
  return (
    <Modal open={openModal.open} handleClose={handleClose}>
      <form className="w-full h-full flex flex-col">
        <Title openModal={openModal} />
        <p className="text-foreground-soft mb-0.5 text-sm">Response to violations:</p>
        <DeleteMessageBox />

        <MuteMemberBox />

        <AdministratorNotice />

        <ButtonGroup handleClose={handleClose} />
      </form>
    </Modal>
  );
};

export default ConfigureModal;
