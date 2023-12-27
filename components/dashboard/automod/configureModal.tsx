import Modal from "@/components/shared/modal";
import Button from "@/components/shared/button";

import { FaRegTrashCan as Trash } from "react-icons/fa6";
import { BsMicMute as Mute } from "react-icons/bs";
import { RiErrorWarningLine as Warning } from "react-icons/ri";

type Props = {
  openModal: null | string;
  handleClose: React.MouseEventHandler;
};

const ConfigureModal = ({ openModal, handleClose }: Props) => {
  // TODO: clean up the code here
  const open = openModal ? true : false;
  return (
    <Modal open={open} handleClose={handleClose}>
      <form className="w-full h-full flex flex-col">
        <h3 className="text-foreground text-xl tracking-tight mb-5">Configure {openModal}</h3>
        <p className="text-foreground-soft mb-0.5 text-sm">Response to violations:</p>
        <div className="flex h-16 rounded-md bg-neutral-800 border border-neutral-700 p-3 pl-0 mb-2">
          <div className="h-full grid place-items-center w-14">
            <Trash className="text-xl" />
          </div>
          <div className="grow h-full flex flex-col">
            <h4>Delete message</h4>
            {/* idk what to say here ill probably change it later  */}
            <p className="text-xs text-foreground-soft/80">Delete the message breaking configured rules</p>
          </div>
        </div>

        <div className="flex h-16 rounded-md bg-neutral-800 border border-neutral-700 p-3 pl-0 mb-4">
          <div className="h-full grid place-items-center w-14">
            <Mute className="text-xl" />
          </div>
          <div className="grow h-full flex flex-col">
            <h4>Mute member</h4>
            <p className="text-xs text-foreground-soft/80">Block members from sending messages</p>
          </div>
        </div>

        <p className="text-foreground-soft text-xs flex items-center mb-5">
          <Warning className="mr-1 text-[16.5px]" />
          Members with administrator can bypass all automod settings and configurations
        </p>

        <div className="flex items-center justify-end">
          <Button
            type="button"
            className="bg-neutral-700/40 hover:bg-neutral-700/20 text-neutral-100 mr-2"
            variant="secondary"
            onClick={handleClose}>
            Cancel
          </Button>
          <Button type="button" variant="secondary">
            Save Configuration
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default ConfigureModal;
