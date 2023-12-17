import Button from "@/components/shared/button";

import { cn } from "@/lib/utils";
import { useState } from "react";

type Option = {
  title: string;
  value: string;
};

type Props = {
  children: React.ReactNode;
  options: Option[];
  onChange?: (option: Option) => void;
};

const Select = ({ children, options, onChange = () => {} }: Props) => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<Option>({ title: "", value: "" });

  function toggleOpen() {
    setOpen(!open);
  }

  function selectOption(option: Option) {
    onChange(option);
    setSelected(option);
    setOpen(false);
  }

  // select component
  return (
    <div className="relative w-fit h-fit">
      <Button
        className={cn(
          "border-secondary text-secondary min-w-[200px] transition-all",
          open && "rounded-b-none"
        )}
        rippleColor="#7C72FF"
        variant="outline"
        onClick={toggleOpen}>
        {selected.value ? selected.title : children}
      </Button>
      {/* select options  */}

      <div
        className={cn(
          `absolute invisible top-full left-[50%] translate-x-[-50%] w-full min-w-[200px] bg-neutral-900 z-10 scale-[.7]
           opacity-0 transition-all duration-150 origin-top max-h-[0] overflow-y-scroll delay-100 rounded-b-md
           border-b border-b-secondary`,
          open && "scale-100 opacity-100 visible max-h-[200px]"
        )}>
        {options &&
          options.map((option, i) => (
            <Button
              key={i}
              className="w-full text-secondary border-secondary border-t-0 first-of-type:border-t rounded-none
            last-of-type:rounded-b-md"
              rippleColor="#7C72FF"
              variant="outline"
              onClick={() => selectOption(option)}>
              {option.title}
            </Button>
          ))}
      </div>
    </div>
  );
};

export default Select;
