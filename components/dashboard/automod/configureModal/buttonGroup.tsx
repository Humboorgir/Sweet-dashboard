import Button from "@/components/shared/button";

export default function ButtonGroup({ handleClose }: { handleClose: React.MouseEventHandler }) {
  return (
    <div className="flex items-center justify-end">
      <Button
        type="button"
        className="bg-neutral-700/40 hover:bg-neutral-700/20 text-neutral-100 mr-2"
        variant="secondary"
        onClick={handleClose}>
        Cancel
      </Button>
      <Button type="submit" variant="secondary">
        Save Configuration
      </Button>
    </div>
  );
}
