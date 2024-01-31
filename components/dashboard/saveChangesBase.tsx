// this component contains the style & animation for the 'Save Changes' bar
// each guild setting category contains its saveChanges logic in its own folder
import Button from "@/components/shared/button";

import { cn } from "@/lib/utils";
import { motion, cubicBezier, AnimatePresence } from "framer-motion";

type Props = {
  modified: boolean;
  loading: boolean;
  resetSettings: React.MouseEventHandler;
  updateSettings: React.MouseEventHandler;
};
const SaveChangesBase = ({ modified, loading, resetSettings, updateSettings }: Props) => {
  return (
    <AnimatePresence>
      {modified && (
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 20, opacity: 0 }}
          transition={{ ease: cubicBezier(0.33, 1, 0.68, 1), delay: 0.1, duration: 0.15 }}
          className={cn(
            `fixed bottom-10 left-0 lg:left-24 right-0 mx-auto flex justify-between items-center
             bg-black z-20 p-4 rounded-md w-[85vw] max-w-[800px] flex-col
              md:flex-row origin-top`
          )}>
          <h3 className="text-lg mb-4 md:mb-0">Careful — you have unsaved changes!</h3>
          <div>
            <Button
              onClick={resetSettings}
              className="text-secondary mr-2 md:text-lg"
              rippleColor="#7C72FF"
              variant="link"
              size="lg">
              Reset
            </Button>
            <Button
              onClick={updateSettings}
              disabled={loading}
              className="text-white bg-secondary/80 hover:bg-secondary/60 md:text-lg
          disabled:opacity-50 ease-linear"
              rippleColor="#7C72FF"
              variant="default"
              size="lg">
              Save changes
            </Button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SaveChangesBase;
