import Button from "@/components/shared/button";

import { toggleSidebar } from "@/redux/features/sidebar";
import { useDispatch } from "react-redux";

import { FaBarsStaggered as Bars } from "react-icons/fa6";

const OpenSidebarButton = () => {
  const dispatch = useDispatch();
  return (
    <Button
      variant="ghost"
      rippleColor="#7C72FF"
      onClick={() => dispatch(toggleSidebar())}
      className="text-3xl z-10 md:hidden block hover:bg-secondary/10">
      <Bars />
    </Button>
  );
};

export default OpenSidebarButton;
