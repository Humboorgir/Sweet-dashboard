import TextArea from "@/components/shared/textarea";
import Variables from "@/components/dashboard/welcomer/variables";
import SelectGoodbyeChannel from "@/components/dashboard/welcomer/selectGoodbyeChannel";

import type { RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { setGoodbyeMsg } from "@/redux/features/guildSettings";

import { AnimatePresence, cubicBezier, motion } from "framer-motion";

const GoodbyeMessagesInputs = ({ enabled }: { enabled: boolean }) => {
  const dispatch = useDispatch();
  const goodbyeMsg = useSelector((state: RootState) => state.guildSettings.goodbyeMsg);

  return (
    <AnimatePresence>
      {enabled && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: -10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -10 }}
          transition={{
            ease: cubicBezier(0.83, 0, 0.17, 1),
            duration: 0.25,
          }}>
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
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default GoodbyeMessagesInputs;
