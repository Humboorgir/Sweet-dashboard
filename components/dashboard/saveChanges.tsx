import Button from "@/components/shared/button";

import { cn } from "@/lib/utils";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";

const SaveChangesButton = () => {
  let modified;
  const state = useSelector((state: RootState) => state.guildSettings);
  if (state.welcomeMsgsEnabled == true || state.goodbyeMsgsEnabled == true) modified = true;

  return (
    <div
      className={cn(
        `fixed bottom-10 left-[50%] translate-x-[-50%] translate-y-[20px] transition-all
       opacity-0 flex justify-between items-center bg-black z-20 lg:ml-24 p-4 rounded-md
        duration-150 w-[85vw] max-w-[800px] flex-col md:flex-row origin-bottom`,
        modified && "opacity-100 translate-y-0"
      )}>
      <h3 className="text-lg mb-4 md:mb-0">Careful — you have unsaved changes!</h3>
      <div>
        <Button className="text-secondary mr-2 md:text-lg" rippleColor="#7C72FF" variant="link" size="lg">
          Reset
        </Button>
        <Button
          className="text-white bg-secondary/80 hover:bg-secondary/60 md:text-lg"
          rippleColor="#7C72FF"
          variant="default"
          size="lg">
          Save changes
        </Button>
      </div>
    </div>
  );
};

export default SaveChangesButton;
