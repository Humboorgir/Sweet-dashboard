import { cn } from "@/lib/utils";

import { BsMicMute as Mute } from "react-icons/bs";

type Props = {
  muteMember: boolean;
  toggleMuteMember: React.MouseEventHandler;
};

const MuteMemberBox = ({ muteMember, toggleMuteMember }: Props) => {
  return (
    <div
      onClick={toggleMuteMember}
      className={cn(
        "relative flex h-16 rounded-md bg-[#191919] border border-[#303030] p-3 pl-0 mb-4 cursor-pointer",
        muteMember && `bg-neutral-800 border-neutral-700`
      )}>
      <div className="h-full grid place-items-center w-14">
        <Mute className="text-xl" />
      </div>
      <div className="grow h-full flex flex-col">
        <h4>Mute member</h4>
        <p className="text-xs text-foreground-soft/80">
          Temporarily restricts the member from sending messages
        </p>
      </div>
    </div>
  );
};

export default MuteMemberBox;
