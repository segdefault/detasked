"use client";

import { type ColumnSchema } from "@/lib/schemas/board";
import KanbanColumnTitle from "./KanbanColumnTitle";
import KanbanNote from "./KanbanNote";

export type KanbanColumnProps = Omit<
	React.HTMLAttributes<HTMLDivElement>,
	"children"
> & {
	column: ColumnSchema;
};

export default function KanbanColumn(props: KanbanColumnProps) {
	const { column, ...divProps } = props;

	const className: KanbanColumnProps["className"] =
		`flex flex-col ` +
		`${divProps.className ?? ""}`;

	return (
		<div
			{...divProps}
			className={className}
		>
			<KanbanColumnTitle
				column={column}
				className="p-4"
			/>
			<div className="flex-1 overflow-scroll rounded-b-xl bg-slate-300 dark:bg-slate-700">
				<div className="flex flex-col p-3 gap-4">
					{column.notes.map(note => (
						<KanbanNote
							key={note.uuid}
							note={note}
							className="h-32 text-foreground"
						/>
					))}
				</div>
			</div>
		</div>
	);
}
