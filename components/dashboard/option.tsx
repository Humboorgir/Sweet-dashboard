import Button from "@/components/shared/button";

import { useRouter } from "next/router";
import { cn } from "@/lib/utils";

type Props = {
  title: string;
  icon: JSX.Element;
  serverId: string;
  href: string;
};

const Option = ({ title, icon, serverId, href }: Props) => {
  const router = useRouter();
  const path = router.pathname.split("/").slice(-1)[0];
  let selected = path == href ? true : false;
  return (
    <Button
      rippleColor="#7C72FF"
      variant="ghost"
      href={`/dashboard/${serverId}/${href}`}
      className={cn(
        `flex items-center hover:bg-secondary/10 w-full justify-start`,
        selected && `bg-gradient-to-br from-secondary-strong/40 to-secondary/40 rounded-md`
      )}>
      <span className={cn("text-base mr-2 text-foreground/80", selected && "text-white/90")}>
        {icon}
      </span>
      <h3 className={cn("text-gradient to-foreground-soft", selected && "text-white/90")}>{title}</h3>
    </Button>
  );
};

export default Option;
