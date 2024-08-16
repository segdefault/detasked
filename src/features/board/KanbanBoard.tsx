"use client";

import { useBoard } from "./BoardProvider";
import KanbanColumn from "./KanbanColumn";

export type KanbanBoardProps = Omit<
	React.HTMLAttributes<HTMLDivElement>,
	"children"
>;

export default function KanbanBoard(props: KanbanBoardProps) {
	const [boardState] = useBoard();

	if (!boardState) {
		const className =
			`dark:bg-slate-900 flex flex-col justify-center items-center gap-2 ` +
			`${props.className ?? ""}`;

		return (
			<div className={className}>
				<p className="text-5xl">:/</p>
				<p className="text-2xl">Board deleted...</p>
			</div>
		);
	}

	return (
		<div
			{...props}
			className={`flex gap-3 p-4 bg-slate-100 dark:bg-slate-900 ${props.className ?? ""}`}
		>
			{boardState.columns.map(col => (
				<KanbanColumn
					key={col.uuid}
					column={col}
					className="flex-1"
				/>
			))}
		</div>
	);
}
