import Setting from "@/components/dashboard/automod/setting";

type Setting = {
  name: string;
  description: string;
  checked: boolean;
  onCheckedChange: Function;
};

type Props = {
  settings: Setting[];
};

const Settings = ({ settings }: Props) => {
  return (
    <div className="flex items-center flex-wrap w-full">
      {settings.map((setting) => {
        return <Setting setting={setting} />;
      })}
    </div>
  );
};

export default Settings;
