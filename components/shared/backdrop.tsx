import { cn } from "@/lib/utils";

type Props = {
  children: React.ReactNode;
  open: boolean;
  className?: string;
};

const Backdrop = ({ children, open, className, ...props }: Props) => {
  // TODO: close the modal when backdrop is clicked
  // not implementing this now cause I havent written the redux thingy yet
  return (
    <div
      {...props}
      className={cn(
        `absolute top-0 left-0 right-0 bottom-0 grid place-items-center bg-black/60 delay-100
      invisible opacity-0 transition-all duration-200 z-[100]`,
        open && "!opacity-100 visible",
        className
      )}>
      {children}
    </div>
  );
};

export default Backdrop;
