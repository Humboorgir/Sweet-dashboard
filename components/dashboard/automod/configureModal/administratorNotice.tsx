import { RiErrorWarningLine as Warning } from "react-icons/ri";

export default function AdministratorNotice({}) {
  return (
    <p className="text-foreground-soft text-xs flex items-center mb-5">
      <Warning className="mr-1 text-[16.5px]" />
      Members with administrator can bypass all automod settings and configurations
    </p>
  );
}
