import Backdrop from "@/components/shared/backdrop";

import { cn } from "@/lib/utils";

type Props = {
  children: React.ReactNode;
  open: boolean;
  className?: string;
};

const Modal = ({ children, open, className, ...props }: Props) => {
  return (
    <Backdrop open={open}>
      <div
        onClick={(e) => e.stopPropagation()}
        {...props}
        className={cn(
          `bg-background text-foreground p-6 max-w-[90vw] opacity-0 scale-[0.8] invisible ease-out delay-100
        rounded-md flex flex-col items-center transition-all duration-200
         ${open && "!opacity-100 scale-100 visible"}`,
          className
        )}>
        {children}
      </div>
    </Backdrop>
  );
};

export default Modal;
