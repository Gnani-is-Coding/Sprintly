function CreateBoardCard() {
  return (
    <div className="flex items-center justify-center h-full min-h-[120px] sm:min-h-[144px] rounded-lg bg-[#282e33] hover:bg-[#323940] cursor-pointer transition-colors">
      <p className="text-sm text-gray-400">Create new board</p>
    </div>
  );
}

export default CreateBoardCard;
