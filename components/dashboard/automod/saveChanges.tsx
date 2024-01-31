import SaveChangesBase from "@/components/dashboard/saveChangesBase";

import { RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { initialState as automodSettingsInitial } from "@/redux/features/automodSettings";
import { resetAutomodSettings } from "@/redux/features/automodSettings";
import { setAlert } from "@/redux/features/alert";

import axios from "axios";
import { useEffect, useState } from "react";

const SaveChangesButton = () => {
  const dispatch = useDispatch();

  const [modified, setModified] = useState(false);
  const [initial, setInitial] = useState(automodSettingsInitial);
  const [loading, setLoading] = useState(false);

  const automodSettings = useSelector((state: RootState) => state.automodSettings);
  const guild = useSelector((state: RootState) => state.guild);

  // detecting changes in automodSettings
  useEffect(() => {
    let automodSettingsString = JSON.stringify(automodSettings);
    let initialStateString = JSON.stringify(initial);
    if (automodSettingsString != initialStateString) setModified(true);
    else setModified(false);
  }, [automodSettings, initial]);

  function resetSettings() {
    dispatch(resetAutomodSettings());
  }

  function updateSettings() {
    // for debugging purposes
    if (!guild.id) return console.log(`[UpdateGuildSettings] No guild.id was found`);

    setLoading(true);

    axios
      .put(`/api/guild/${guild.id}/automod`, automodSettings)
      .then((res) => res.data)
      .then((res) => {
        setInitial(automodSettings);
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
