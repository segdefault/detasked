import BoardProvider from "@/features/board/BoardProvider";
import KanbanBoard from "@/features/board/KanbanBoard";
import Navbar from "@/features/navbar/Navbar";
import { getBoardSa } from "@/lib/sa/board";

export default async function BoardPage(props: {
	params: { boardId: string };
}) {
	const boardId = props.params.boardId;
	const boardResponse = await getBoardSa(props.params.boardId);
	const board =
		boardResponse.status == "success" ? boardResponse.content : undefined;
	const boardState = board ? { boardId, modified: false, ...board } : null;

	return (
		<BoardProvider initialValue={boardState}>
			<div className="h-dvh flex flex-col">
				<Navbar position="static" />
				<KanbanBoard className="min-h-0 flex-1" />
			</div>
		</BoardProvider>
	);
}
