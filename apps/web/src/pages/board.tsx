import { useParams } from "react-router-dom";
import BoardHeader from "../components/board/BoardHeader";
import BoardColumns from "../components/board/BoardColumns";

// Static board data for now
const boardsMap: Record<string, string> = {
  "1": "Demo Board",
  "2": "Testing",
};

// #TODO: to integrate with the bgColor, which we'll get from API response.

function Board() {
  const { boardId } = useParams();
  const boardTitle = boardsMap[boardId ?? ""] ?? "Untitled Board";

  return (
    <div className="flex flex-col h-full -m-4 lg:-m-8">
      <BoardHeader title={boardTitle} />
      <BoardColumns />
    </div>
  );
}

export default Board;
