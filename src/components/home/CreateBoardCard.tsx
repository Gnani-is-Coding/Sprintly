import CreatePopover from "../board/create-board/CreatePopover";
import useResponsive from "@/hooks/useResponsive";

function CreateBoardCard() {
  const { isDesktopDevice } = useResponsive();

  return (
    <CreatePopover
      contentPosition={{
        align: isDesktopDevice ? "center" : "start",
        side: isDesktopDevice ? "right" : "bottom",
      }}
      TriggerComponent={
        <button className="flex items-center justify-center h-full min-h-30 sm:min-h-36 rounded-lg bg-[#282e33] hover:bg-[#323940] cursor-pointer transition-colors">
          <p className="text-sm text-gray-400">Create new board</p>
        </button>
      }
    />
  );
}

export default CreateBoardCard;
