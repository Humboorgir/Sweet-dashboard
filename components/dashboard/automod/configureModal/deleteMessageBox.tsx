import { cn } from "@/lib/utils";

import { FaRegTrashCan as Trash } from "react-icons/fa6";

type Props = {
  deleteMessage: boolean;
  toggleDeleteMessage: React.MouseEventHandler;
};

const DeleteMessageBox = ({ deleteMessage, toggleDeleteMessage }: Props) => {
  return (
    <div
      onClick={toggleDeleteMessage}
      className={cn(
        "flex h-16 rounded-md bg-[#191919] border border-[#303030] p-3 pl-0 mb-2 cursor-pointer",
        deleteMessage && "bg-neutral-800 border-neutral-700"
      )}>
      <div className="h-full grid place-items-center w-14">
        <Trash className="text-xl" />
      </div>
      <div className="grow h-full flex flex-col">
        <h4>Delete message</h4>
        <p className="text-xs text-foreground-soft/80">Deletes rule-violating messages sent by the member</p>
      </div>
    </div>
  );
};

export default DeleteMessageBox;
