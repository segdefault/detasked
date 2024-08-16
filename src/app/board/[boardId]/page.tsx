import BoardProvider from "@/features/board/BoardProvider";
import KanbanBoard from "@/features/board/KanbanBoard";
import { getBoardSa } from "@/lib/sa/board";

export default async function BoardPage(props: {
	params: { boardId: string };
}) {
	const boardId = props.params.boardId;
	const board = await getBoardSa(props.params.boardId);
	const boardState = board ? { boardId, ...board } : null;

	return (
		<BoardProvider initialValue={boardState}>
			<div className="h-dvh">
				<KanbanBoard className="h-full" />
			</div>
		</BoardProvider>
	);
}
