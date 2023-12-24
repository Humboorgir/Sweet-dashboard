import Button from "@/components/shared/button";

import { cn } from "@/lib/utils";
import { RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { initialState } from "@/redux/features/guildSettings";
import { resetSettings } from "@/redux/features/guildSettings";
import { setAlert } from "@/redux/features/alert";

import axios from "axios";
import { useEffect, useState } from "react";

const SaveChangesButton = () => {
  const [modified, setModified] = useState(false);
  const guildSettings = useSelector((state: RootState) => state.guildSettings);
  const guild = useSelector((state: RootState) => state.guild);

  useEffect(() => {
    let guildSettingsString = JSON.stringify(guildSettings);
    let initialStateString = JSON.stringify(initialState);
    if (guildSettingsString != initialStateString) setModified(true);
    else setModified(false);
  }, [guildSettings]);

  const dispatch = useDispatch();

  function resetGuildSettings() {
    dispatch(resetSettings());
  }

  function updateGuildSettings() {
    // for debugging purposes
    if (!guild.id) return console.log(`[UpdateGuildSettings] No guild.id was found`);
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
          onClick={resetGuildSettings}
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
