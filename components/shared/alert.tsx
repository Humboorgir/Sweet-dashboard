import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";
import { AnimatePresence, cubicBezier, motion } from "framer-motion";
import { useSelector } from "react-redux";
import type { RootState } from "@/redux/store";

import { MdOutlineErrorOutline as Error } from "react-icons/md";
import { FaCheckCircle as Success } from "react-icons/fa";
import { MdInfoOutline as Info } from "react-icons/md";

const Alert = () => {
  const [open, setOpen] = useState(false);
  const alert = useSelector((state: RootState) => state.alert);

  useEffect(() => {
    if (!alert.message) return;
    setOpen(true);
    const timeout = setTimeout(() => {
      setOpen(false);
    }, 5000);

    return () => {
      clearTimeout(timeout);
    };
  }, [alert]);

  const customStyles = {
    error: "bg-red-700",
    success: "bg-green-700",
    info: "bg-amber-600",
  };
  const icons = {
    error: <Error className="mr-0.5 text-xl" />,
    success: <Success className="mr-1 text-lg" />,
    info: <Info className="mr-0.5 text-lg" />,
  };

  //   @ts-ignore
  const customStyle = customStyles[alert.type];
  //   @ts-ignore
  const icon = icons[alert.type];

  const title = alert.type[0].toUpperCase() + alert.type.slice(1);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{
            scale: 0.88,
            opacity: 0,
          }}
          animate={{
            scale: 1,
            opacity: 1,
          }}
          exit={{
            scale: 0.88,
            opacity: 0,
          }}
          transition={{
            ease: cubicBezier(0.22, 1, 0.36, 1),
            duration: 0.2,
          }}
          className={cn(
            `fixed z-[100] top-5 py-1.5 px-4 rounded-full flex items-center justify-center
          w-fit mx-auto left-0 right-0 text-white`,
            customStyle
          )}>
          <strong className="flex items-center mr-2">
            {icon}
            {title}!
          </strong>{" "}
          {alert.message}
        </motion.div>
      )}
    </AnimatePresence>
  );
  return null;
};

export default Alert;
