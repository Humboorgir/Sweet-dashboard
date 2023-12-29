import { FaRegTrashCan as Trash } from "react-icons/fa6";

const DeleteMessageBox = () => {
  return (
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
  );
};

export default DeleteMessageBox;
