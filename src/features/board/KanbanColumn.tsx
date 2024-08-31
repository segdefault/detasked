"use client";

import React from "react";

import { PlusOutlined } from "@ant-design/icons";
import { useDndContext, useDroppable } from "@dnd-kit/core";
import {
	SortableContext,
	verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { Button } from "@nextui-org/react";

import { genDefaultNote } from "@/lib/misc/default_board";
import { type ColumnSchema, type NoteSchema } from "@/lib/schemas/board";
import KanbanColumnTitle from "./KanbanColumnTitle";
import KanbanNote, { SortableData } from "./KanbanNote";
import SortableKanbanNote from "./SortableKanbanNote";

export type KanbanColumnProps = Omit<
	React.HTMLAttributes<HTMLDivElement>,
	"children"
> & {
	column: ColumnSchema;
	onNoteAdd?: (position: number) => void;
	onNoteDelete?: (position: number) => void;
	onNoteEdit?: (position: number, note: NoteSchema) => void;
};

const AddNoteButton = (props: { onClick?: () => void }) => (
	<Button
		variant="light"
		size="sm"
		fullWidth
		className="h-4 my-px !transition-all hover:h-8 text-foreground/0 hover:text-foreground/100"
		onClick={props.onClick}
	>
		<PlusOutlined />
	</Button>
);

const dummyNote = (
	<KanbanNote
		key={"dummy"}
		note={genDefaultNote()}
		displayRepresentation={true}
		className="h-32 outline-secondary"
	/>
);

export default function KanbanColumn(props: KanbanColumnProps) {
	const { column, onNoteAdd, onNoteDelete, onNoteEdit, ...divProps } = props;

	const { setNodeRef, over } = useDroppable({ id: column.uuid });
	const { active } = useDndContext();

	const sortableContextItems = column.notes.map(n => n.uuid);
	const className: KanbanColumnProps["className"] =
		`flex flex-col ` + `${divProps.className ?? ""}`;
	const activeNodeData = active?.data.current as SortableData | null;
	const draggableOwner = activeNodeData?.sortable.containerId === column.uuid;
	const draggableOverColumn = over?.id === column.uuid;

	return (
		<div
			{...divProps}
			className={className}
			ref={setNodeRef}
		>
			<KanbanColumnTitle
				column={column}
				className="p-4"
			/>
			<div className="flex-1 overflow-auto rounded-b-xl bg-slate-300 dark:bg-slate-700">
				<SortableContext
					id={column.uuid}
					items={sortableContextItems}
					strategy={verticalListSortingStrategy}
				>
					<div className="flex flex-col px-3">
						{column.notes.flatMap((note, noteIndex) => [
							<AddNoteButton
								key={noteIndex}
								onClick={() => onNoteAdd && onNoteAdd(noteIndex)}
							/>,
							over?.id === note.uuid && !draggableOwner ? (
								<>
									{dummyNote}
									<AddNoteButton key={"dummy-add"} />
								</>
							) : null,
							<SortableKanbanNote
								key={note.uuid}
								note={note}
								className="h-32 text-foreground"
								onNoteDelete={() => onNoteDelete?.(noteIndex)}
								onNoteEdit={note => onNoteEdit?.(noteIndex, note)}
								displayRepresentation={note.uuid === activeNodeData?.note.uuid}
							/>,
						])}
						<AddNoteButton onClick={() => onNoteAdd?.(column.notes.length)} />
						{draggableOverColumn &&
							!draggableOwner &&
							activeNodeData?.sortable.containerId &&
							dummyNote}
					</div>
				</SortableContext>
			</div>
		</div>
	);
}
