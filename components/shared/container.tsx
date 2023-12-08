import { cn } from "@/lib/utils";
import { ClassValue } from "clsx";

type Props = React.HTMLProps<HTMLDivElement> & {
  className?: ClassValue;
};

const Container = ({ children, className, ...props }: Props) => {
  return (
    <div {...props} className={cn("w-[92%] md:w-[83%] mx-auto", className)}>
      {children}
    </div>
  );
};

export default Container;
