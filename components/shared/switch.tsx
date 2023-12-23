import * as Switch from "@radix-ui/react-switch";
import type { SwitchProps } from "@radix-ui/react-switch";

import { cn } from "@/lib/utils";

type Props = SwitchProps & { size?: "default" | "lg" | "sm" };

const sizeClassNames = {
  default: {
    root: "h-6 w-[64px]",
    thumb: `h-7 w-7 data-[state='checked']:translate-x-[38px]`,
  },
  sm: {
    root: "h-[20px] w-14",
    thumb: `h-6 w-6 data-[state='checked']:translate-x-[32px]`,
  },
  lg: {
    root: "h-8 w-[92px]",
    thumb: `h-10 w-10 data-[state='checked']:translate-x-[54px]`,
  },
};
const SwitchComponent = ({ checked, className, size = "default", ...props }: Props) => {
  if (!(size in sizeClassNames)) throw Error(`[Switch Component] ${size} is not a valid size`);

  return (
    <Switch.Root
      checked={checked}
      className={cn(
        `w-[64px] h-6 flex items-center bg-white/60 rounded-full relative group
      data-[state='checked']:bg-secondary/50 transition-colors duration-100`,
        sizeClassNames[size].root,
        className
      )}
      {...props}>
      <Switch.Thumb
        className={cn(
          `block h-7 w-7 rounded-full bg-white/90 transition-transform translate-x-0
           data-[state='checked']:translate-x-[38px] data-[state='checked']:bg-secondary`,
          sizeClassNames[size].thumb
        )}
      />
    </Switch.Root>
  );
};

export default SwitchComponent;
