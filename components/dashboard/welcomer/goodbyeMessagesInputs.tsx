import TextArea from "@/components/shared/textarea";
import Variables from "@/components/dashboard/welcomer/variables";
import SelectGoodbyeChannel from "@/components/dashboard/welcomer/selectGoodbyeChannel";

import type { RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { setGoodbyeMsg } from "@/redux/features/welcomerSettings";

import { AnimatePresence, cubicBezier, motion } from "framer-motion";

const GoodbyeMessagesInputs = ({ enabled }: { enabled: boolean }) => {
  const dispatch = useDispatch();
  const goodbyeMsg = useSelector(
    (state: RootState) => state.welcomerSettings.goodbye.message
  );

  return (
    <AnimatePresence>
      {enabled && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{
            duration: 0.4,
            ease: cubicBezier(0.22, 1, 0.36, 1),
          }}>
          <div className="py-4">
            <TextArea
              placeholder="Goodbye message"
              onChange={(e) => dispatch(setGoodbyeMsg(e.target.value))}
              value={goodbyeMsg}
              className="!bg-neutral-900"
            />
          </div>
          {/* SelectChannel and Variables container  */}
          <div className="flex justify-between px-2 flex-wrap max-w-[670px] w-full">
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
