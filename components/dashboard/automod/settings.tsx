import Setting from "@/components/dashboard/automod/setting";

type Setting = {
  name: string;
  description: string;
  checked: boolean;
  onCheckedChange: Function;
};

type Props = {
  settings: Setting[];
  openConfigureModal: Function;
};

const Settings = ({ settings, openConfigureModal }: Props) => {
  return (
    <div className="flex items-center flex-wrap w-full">
      {settings.map((setting) => {
        return <Setting setting={setting} openConfigureModal={openConfigureModal} />;
      })}
    </div>
  );
};

export default Settings;
