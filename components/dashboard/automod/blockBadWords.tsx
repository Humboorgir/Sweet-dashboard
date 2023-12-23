import Switch from "@/components/shared/switch";

import { useState } from "react";

const BlockBadWords = () => {
  const [enabled, setEnabled] = useState(false);
  return (
    <div
      className="border-neutral-700 bg-neutral-800 rounded-md p-3 max-w-xs h-32
    flex flex-col mb-4 mr-3">
      <h4 className="font-bold text-lg tracking-tight text-gradient mb-0.5">Block Bad Words</h4>
      <p className="text-foreground-soft text-sm">
        Deletes messages that contain configured blacklisted words
      </p>
      <Switch
        className="mt-auto"
        size="sm"
        id="blockBadWordsCheckbox"
        checked={enabled}
        onCheckedChange={(checked: boolean) => setEnabled(checked)}
      />
    </div>
  );
};

export default BlockBadWords;
