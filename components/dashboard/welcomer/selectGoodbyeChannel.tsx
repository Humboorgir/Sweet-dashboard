import Select from "@/components/shared/select";

import { setGoodbyeChannel } from "@/redux/features/welcomerSettings";
import { RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";

const SelectGoodbyeChannel = () => {
  const dispatch = useDispatch();
  const goodbyeChannel = useSelector(
    (state: RootState) => state.welcomerSettings.goodbye.channelId
  );
  const guildChannels = useSelector(
    (state: RootState) => state.guildChannels.data
  );

  const options = guildChannels
    ? guildChannels.map((channel) => {
        return {
          title: "#" + channel.name,
          value: channel.id,
        };
      })
    : [{ title: "Loading...", value: "" }];

  return (
    <Select
      options={options}
      initialSelected={goodbyeChannel}
      onChange={(option) => {
        dispatch(setGoodbyeChannel(option.value));
      }}>
      Select goodbye channel
    </Select>
  );
};

export default SelectGoodbyeChannel;
