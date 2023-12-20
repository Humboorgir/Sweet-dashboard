import TextArea from "@/components/shared/textarea";
import Variables from "@/components/dashboard/welcomer/variables";
import SelectGoodbyeChannel from "@/components/dashboard/welcomer/selectGoodbyeChannel";

import type { RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { setGoodbyeMsg } from "@/redux/features/guildSettings";

const GoodbyeMessagesInputs = () => {
  const dispatch = useDispatch();
  const goodbyeMsg = useSelector((state: RootState) => state.guildSettings.goodbyeMsg);

  return (
    <div>
      <TextArea
        placeholder="Goodbye message"
        onChange={(e) => dispatch(setGoodbyeMsg(e.target.value))}
        value={goodbyeMsg}
        className="mb-4 mt-4 !bg-neutral-900"
      />
      {/* SelectChannel and Variables container  */}
      <div className="flex justify-between px-2 mb-10 flex-wrap max-w-[670px] w-full">
        <Variables />
        {/* Welcome channel selection  */}
        <div>
          <h3 className="text-gradient mb-0.5">Send to: </h3>
          <SelectGoodbyeChannel />
        </div>
      </div>
      {/* container end  */}
    </div>
  );
};

export default GoodbyeMessagesInputs;
