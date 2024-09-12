import Select from "@/components/shared/select";

import { setWelcomeChannel } from "@/redux/features/welcomerSettings";
import { RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";

const SelectWelcomeChannel = () => {
  const dispatch = useDispatch();
  const welcomeChannel = useSelector(
    (state: RootState) => state.welcomerSettings.welcome.channelId
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
      initialSelected={welcomeChannel}
      onChange={(option) => {
        dispatch(setWelcomeChannel(option.value));
      }}>
      Select welcome channel
    </Select>
  );
};

export default SelectWelcomeChannel;
