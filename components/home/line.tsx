import { cn } from "@/lib/utils";

const Line = ({ children: icon, className }: { children: React.ReactNode; className?: string }) => {
  return (
    <div
      className={cn("absolute left-0 top-0 bottom-0 w-2 flex rounded-full text-2xl", className)}
      style={{ background: "linear-gradient(transparent 8%, #7C72FF 38%, #9333ea 58%, transparent 100%);" }}>
      <div
        className="text-2xl h-fit w-fit text-white relative before:content-['']
        before:absolute before:top-0 before:left-0 before:right-0 before:bottom-0
        before:bg-secondary before:blur-lg z-10 left-[50%] translate-x-[-50%]">
        {icon}
      </div>
    </div>
  );
};

export default Line;
