import Select from "@/components/shared/select";

import { setWelcomeChannel } from "@/redux/features/guildSettings";
import { RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";

const SelectWelcomeChannel = () => {
  const dispatch = useDispatch();
  const guildChannels = useSelector((state: RootState) => state.guildChannels.data);

  const option = guildChannels.map((channel) => {
    return {
      title: "#" + channel.name,
      value: channel.id,
    };
  });

  return (
    <Select
      options={option}
      onChange={(option) => {
        dispatch(setWelcomeChannel(option));
      }}>
      Select welcome channel
    </Select>
  );
};

export default SelectWelcomeChannel;
