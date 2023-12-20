import Select from "@/components/shared/select";

import { setGoodbyeChannel } from "@/redux/features/guildSettings";
import { RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";

const SelectGoodbyeChannel = () => {
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
        dispatch(setGoodbyeChannel(option));
      }}>
      Select goodbye channel
    </Select>
  );
};

export default SelectGoodbyeChannel;
