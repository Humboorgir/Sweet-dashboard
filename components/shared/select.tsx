import Button from "@/components/shared/button";

import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

type Option = {
  title: string;
  value: string;
};

type Props = Omit<React.HTMLProps<HTMLDivElement>, "onChange"> & {
  children: React.ReactNode;
  options: Option[];
  initialSelected?: string;
  btnClassName?: string;
  menuClassName?: string;
  menuItemClassName?: string;
  onChange?: (option: Option) => void;
};

const Select = ({
  children,
  options,
  initialSelected = "",
  btnClassName,
  menuClassName,
  menuItemClassName,
  className,
  onChange = () => {},
}: Props) => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<string>(initialSelected);

  function toggleOpen() {
    setOpen(!open);
  }

  function selectOption(option: Option) {
    onChange(option);
    setSelected(option.value);
    setOpen(false);
  }

  // select component
  return (
    <div className={cn("relative w-fit h-fit", className)}>
      <Button
        className={cn(
          "border-secondary text-secondary min-w-[200px] transition-all w-full",
          btnClassName,
          open && "rounded-b-none"
        )}
        rippleColor="#7C72FF"
        variant="outline"
        onClick={toggleOpen}>
        {/* if an option is selected, display its title, if not display the default placeholder  */}
        {selected ? options.find((x) => x.value == selected)?.title : children}
      </Button>
      {/* select options  */}

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{
              duration: 0.3,
              delay: 0.1,
              ease: [0.22, 1, 0.36, 1],
            }}
            className={cn(
              `absolute left-0 w-full min-w-[200px] bg-neutral-900 z-20
        origin-top max-h-[200px] overflow-y-scroll rounded-b-md
           border-b border-b-secondary`,
              menuClassName
            )}>
            {options &&
              options.map((option, i) => (
                <Button
                  key={i}
                  className={cn(
                    `w-full justify-start text-secondary border-secondary border-t-0 first-of-type:border-t rounded-none
            last-of-type:rounded-b-md`,
                    menuItemClassName
                  )}
                  rippleColor="#7C72FF"
                  variant="outline"
                  onClick={() => selectOption(option)}>
                  {option.title}
                </Button>
              ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Select;
