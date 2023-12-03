import * as Switch from "@radix-ui/react-switch";
// using radix ui's switch component for now cause
//  i dont have the time to make one myself
const SwitchComponent = ({ ...props }) => {
  return (
    <Switch.Root
      className="w-[64px] h-6 flex items-center bg-white/60 rounded-full relative group
  data-[state='checked']:bg-secondary/50 transition-colors duration-100"
      {...props}>
      <Switch.Thumb
        className="block h-7 w-7 rounded-full bg-white/90 transition-transform
    translate-x-0 data-[state='checked']:translate-x-[38px] data-[state='checked']:bg-secondary"></Switch.Thumb>
    </Switch.Root>
  );
};

export default SwitchComponent;
