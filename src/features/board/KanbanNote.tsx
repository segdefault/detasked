"use client";

import { gochiHand } from "@/lib/fonts";
import { type NoteSchema } from "@/lib/schemas/board";

export type KanbanNoteProps = Omit<
	React.HTMLAttributes<HTMLDivElement>,
	"children"
> & {
	note: NoteSchema;
};

export default function KanbanNote(props: KanbanNoteProps) {
	const { note, ...divProps } = props;

	const className: KanbanNoteProps["className"] =
		`bg-slate-100 dark:bg-slate-600 rounded-xl text-center content-center ` +
		`${gochiHand.className} ${divProps.className ?? ""}`;

	return (
		<div
			{...divProps}
			className={className}
		>
			<p>{note.content}</p>
		</div>
	);
}
