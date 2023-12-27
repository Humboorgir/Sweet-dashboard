import { cn } from "@/lib/utils";

type Props = {
  children: React.ReactNode;
  open: boolean;
  handleClose: React.MouseEventHandler;
  className?: string;
};

const Backdrop = ({ children, open, handleClose, className, ...props }: Props) => {
  return (
    <div
      {...props}
      className={cn(
        `absolute top-0 left-0 right-0 bottom-0 grid place-items-center bg-black/60 delay-100
      invisible opacity-0 transition-all duration-200 z-[100]`,
        open && "!opacity-100 visible",
        className
      )}
      onClick={handleClose}>
      {children}
    </div>
  );
};

export default Backdrop;
