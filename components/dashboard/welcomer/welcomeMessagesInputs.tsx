import TextArea from "@/components/shared/textarea";
import SelectWelcomeChannel from "@/components/dashboard/welcomer/selectWelcomeChannel";
import Variables from "@/components/dashboard/welcomer/variables";

import type { RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { setWelcomeMsg } from "@/redux/features/guildSettings";

import { AnimatePresence, motion, cubicBezier } from "framer-motion";

const WelcomeMessagesInputs = ({ enabled }: { enabled: boolean }) => {
  const dispatch = useDispatch();
  const welcomeMsg = useSelector(
    (state: RootState) => state.guildSettings.welcomeMsg
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
          {/* text input  */}
          <div className="py-4">
            <TextArea
              placeholder="Welcome message"
              onChange={(e) => dispatch(setWelcomeMsg(e.target.value))}
              value={welcomeMsg}
              className="bg-neutral-900"
            />
          </div>
          {/* SelectChannel and Variables container  */}
          <div className="flex justify-between px-2 flex-wrap max-w-[670px] w-full">
            <Variables />
            {/* Welcome channel selection  */}
            <div>
              <h3 className="text-gradient mb-0.5">Send to: </h3>
              <SelectWelcomeChannel />
            </div>
          </div>
          {/* container end  */}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default WelcomeMessagesInputs;
