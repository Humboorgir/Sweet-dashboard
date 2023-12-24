import Button from "@/components/shared/button";

import { cn } from "@/lib/utils";
import { RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { initialState as guildSettingsInitial } from "@/redux/features/guildSettings";
import { resetSettings as resetGuildSettings } from "@/redux/features/guildSettings";
import { initialState as automodSettingsInitial } from "@/redux/features/automodSettings";
import { resetAutomodSettings } from "@/redux/features/automodSettings";
import { setAlert } from "@/redux/features/alert";

import axios from "axios";
import { useEffect, useState } from "react";

const SaveChangesButton = () => {
  const [modified, setModified] = useState(false);
  const guildSettings = useSelector((state: RootState) => state.guildSettings);
  const automodSettings = useSelector((state: RootState) => state.automodSettings);
  const guild = useSelector((state: RootState) => state.guild);

  // detecting changes in guildSettings (i'll rename it to welcomerSettings later)
  useEffect(() => {
    let guildSettingsString = JSON.stringify(guildSettings);
    let initialStateString = JSON.stringify(guildSettingsInitial);
    if (guildSettingsString != initialStateString) setModified(true);
    else setModified(false);
  }, [guildSettings]);

  // detecting changes in automodSettings
  useEffect(() => {
    let automodSettingsString = JSON.stringify(automodSettings);
    let initialStateString = JSON.stringify(automodSettingsInitial);
    if (automodSettingsString != initialStateString) setModified(true);
    else setModified(false);
  }, [automodSettings]);

  const dispatch = useDispatch();

  function resetSettings() {
    dispatch(resetGuildSettings());
    dispatch(resetAutomodSettings());
  }

  function updateGuildSettings() {
    // for debugging purposes
    if (!guild.id) return console.log(`[UpdateGuildSettings] No guild.id was found`);

    // TODO: make this work with automod settings
    axios
      .put(`/api/guild/${guild.id}`, guildSettings)
      .then((res) => res.data)
      .then((res) => dispatch(setAlert({ type: "success", message: res.message })))
      .catch((err) => {
        const { message: errMessage } = err.response.data;
        dispatch(setAlert({ type: "error", message: errMessage }));
      });
  }

  return (
    <div
      className={cn(
        `fixed bottom-10 left-[50%] translate-x-[-50%] translate-y-[20px] transition-all
       opacity-0 flex justify-between items-center bg-black z-20 lg:ml-24 p-4 rounded-md
        duration-150 w-[85vw] max-w-[800px] flex-col md:flex-row origin-bottom delay-100`,
        modified && "opacity-100 translate-y-0"
      )}>
      <h3 className="text-lg mb-4 md:mb-0">Careful — you have unsaved changes!</h3>
      <div>
        <Button
          onClick={resetSettings}
          className="text-secondary mr-2 md:text-lg"
          rippleColor="#7C72FF"
          variant="link"
          size="lg">
          Reset
        </Button>
        <Button
          onClick={updateGuildSettings}
          className="text-white bg-secondary/80 hover:bg-secondary/60 md:text-lg"
          rippleColor="#7C72FF"
          variant="default"
          size="lg">
          Save changes
        </Button>
      </div>
    </div>
  );
};

export default SaveChangesButton;
