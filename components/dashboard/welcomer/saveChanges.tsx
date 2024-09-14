import SaveChangesBase from "@/components/dashboard/saveChangesBase";

import { RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import {
  initialState as defaultGuildSettingsInitial,
  setWelcomerSettings,
  type State,
} from "@/redux/features/welcomerSettings";
import { setAlert } from "@/redux/features/alert";

import axios from "axios";
import { useEffect, useState } from "react";

const SaveChangesButton = ({
  guildSettingsInitial,
}: {
  guildSettingsInitial: State;
}) => {
  const dispatch = useDispatch();

  const [modified, setModified] = useState(false);
  const [initial, setInitial] = useState(
    guildSettingsInitial ?? defaultGuildSettingsInitial
  );
  const [loading, setLoading] = useState(false);

  const guildSettings = useSelector(
    (state: RootState) => state.welcomerSettings
  );
  const guild = useSelector((state: RootState) => state.guild);

  useEffect(() => {
    let guildSettingsString = JSON.stringify(guildSettings);
    let initialStateString = JSON.stringify(initial);
    if (guildSettingsString != initialStateString) setModified(true);
    else setModified(false);
  }, [guildSettings, initial]);

  function resetSettings() {
    dispatch(setWelcomerSettings(initial));
  }

  function updateSettings() {
    // for debugging purposes
    if (!guild.id)
      return console.log(`[UpdateGuildSettings] No guild.id was found`);

    setLoading(true);

    axios
      .put(`/api/guild/${guild.id}/welcomer`, guildSettings)
      .then((res) => res.data)
      .then((res) => {
        setInitial(guildSettings);
        dispatch(setAlert({ type: "success", message: res.message }));
      })
      .catch((err) => {
        const { message: errMessage } = err.response.data;
        dispatch(setAlert({ type: "error", message: errMessage }));
      })
      .finally(() => setLoading(false));
  }

  return (
    <SaveChangesBase
      modified={modified}
      loading={loading}
      updateSettings={updateSettings}
      resetSettings={resetSettings}
    />
  );
};

export default SaveChangesButton;
