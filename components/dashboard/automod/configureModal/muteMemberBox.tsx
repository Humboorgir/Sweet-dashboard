import { BsMicMute as Mute } from "react-icons/bs";

const MuteMemberBox = () => {
  return (
    <div className="flex h-16 rounded-md bg-neutral-800 border border-neutral-700 p-3 pl-0 mb-4">
      <div className="h-full grid place-items-center w-14">
        <Mute className="text-xl" />
      </div>
      <div className="grow h-full flex flex-col">
        <h4>Mute member</h4>
        <p className="text-xs text-foreground-soft/80">Block members from sending messages</p>
      </div>
    </div>
  );
};

export default MuteMemberBox;
