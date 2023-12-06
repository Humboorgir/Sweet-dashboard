import Button from "@/components/shared/button";
import OpenSidebarButton from "@/components/dashboard/openSidebarButton";

import { IoMdSettings as Settings } from "react-icons/io";

const Navbar = () => {
  return (
    <div
      className="absolute left-0 top-0 w-screen h-[52px] z-50
  flex items-center justify-between px-8 text-foreground-soft">
      <OpenSidebarButton />

      {/* name & logo (kinda)  */}
      <div className="text-[19px] flex items-center font-bold">
        <Settings className="text-2xl mr-2" />
        Dashboard
      </div>

      <Button className="md:block hidden text-sm hover:bg-secondary/10" size="sm" variant="ghost">
        Commands
      </Button>
    </div>
  );
};

export default Navbar;
