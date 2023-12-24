import Button from "@/components/shared/button";
import Switch from "@/components/shared/switch";
import React from "react";

const Setting = ({ setting }: { setting: any }) => {
  const { name, description, checked, onCheckedChange } = setting;

  function openConfigureModal() {
    // TODO: implement this
    return;
  }
  return (
    <div
      className="border-neutral-700 bg-neutral-800 rounded-md p-3 max-w-xs h-40
         mb-4 mr-3">
      {/* head  */}
      <div className="flex justify-between">
        <h4 className="font-bold text-xl tracking-tight text-gradient mb-1.5">{name}</h4>{" "}
        <Switch size="sm" checked={checked} onCheckedChange={onCheckedChange} />
      </div>

      <p className="text-foreground-soft/80 text-sm mb-4">{description}</p>

      <Button
        className="bg-secondary/80 hover:bg-secondary/60 w-full"
        rippleColor="#7C72FF"
        onClick={openConfigureModal}>
        Configure
      </Button>
    </div>
  );
};

export default Setting;
