import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { ClassValue } from "clsx";

interface Props {
  children?: ReactNode;
  className?: ClassValue;
}

const Container = ({ children, className }: Props) => {
  return <div className={cn("w-[92%] md:w-[83%] mx-auto", className)}>{children}</div>;
};

export default Container;
