import { cn } from "@/lib/utils";
import { HtmlHTMLAttributes } from "react";

type Props = HtmlHTMLAttributes<HTMLDivElement>;

const Footer = ({ className, ...props }: Props) => {
  // basic footer for now
  // ill make a better one later
  return (
    <footer
      className={cn(
        "w-full border-t-2 border-t-neutral-800 py-5 grid place-items-center text-foreground-light",
        className
      )}
      {...props}>
      Copyright &copy; 2023 - all rights reserved
    </footer>
  );
};

export default Footer;
