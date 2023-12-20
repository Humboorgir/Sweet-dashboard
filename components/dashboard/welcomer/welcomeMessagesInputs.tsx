import TextArea from "@/components/shared/textarea";
import SelectWelcomeChannel from "@/components/dashboard/welcomer/selectWelcomeChannel";
import Variables from "@/components/dashboard/welcomer/variables";

import type { RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { setWelcomeMsg } from "@/redux/features/guildSettings";

const WelcomeMessagesInputs = () => {
  const dispatch = useDispatch();
  const welcomeMsg = useSelector((state: RootState) => state.guildSettings.welcomeMsg);
  return (
    <div>
      {/* text input  */}
      <TextArea
        placeholder="Welcome message"
        onChange={(e) => dispatch(setWelcomeMsg(e.target.value))}
        value={welcomeMsg}
        className="mb-4 mt-4 bg-neutral-900"
      />

      {/* SelectChannel and Variables container  */}
      <div className="flex justify-between px-2 mb-10 flex-wrap max-w-[670px] w-full">
        <Variables />
        {/* Welcome channel selection  */}
        <div>
          <h3 className="text-gradient mb-0.5">Send to: </h3>
          <SelectWelcomeChannel />
        </div>
      </div>
      {/* container end  */}
    </div>
  );
};

export default WelcomeMessagesInputs;
