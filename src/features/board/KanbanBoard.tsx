"use client";

import React from "react";

import {
	DndContext,
	DragEndEvent,
	DragOverlay,
	DragStartEvent,
} from "@dnd-kit/core";

import { genDefaultNote } from "@/lib/misc/default_board";
import { type NoteSchema } from "@/lib/schemas/board";
import { useBoard } from "./BoardProvider";
import KanbanColumn from "./KanbanColumn";
import KanbanNote, { SortableData } from "./KanbanNote";

export type KanbanBoardProps = Omit<
	React.HTMLAttributes<HTMLDivElement>,
	"children"
>;

export default function KanbanBoard(props: KanbanBoardProps) {
	const [boardState, setBoardState] = useBoard();
	const [dragData, setDragData] = React.useState<SortableData>();

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

	const onNoteAdd = (colId: number, pos: number) => {
		const newState = structuredClone(boardState);
		newState.columns[colId].notes.splice(pos, 0, genDefaultNote());
		newState.modified = true;

		setBoardState(newState);
	};
	const onNoteDelete = (colId: number, pos: number) => {
		const newState = structuredClone(boardState);
		newState.columns[colId].notes.splice(pos, 1);
		newState.modified = true;

		setBoardState(newState);
	};
	const onNoteEdit = (colId: number, position: number, note: NoteSchema) => {
		const newState = structuredClone(boardState);
		newState.columns[colId].notes[position] = structuredClone(note);
		newState.modified = true;

		setBoardState(newState);
	};
	const onNoteDragStart = (e: DragStartEvent) =>
		setDragData(e.active.data.current as SortableData);
	const onNoteDragEnd = (e: DragEndEvent) => {
		const { active, over } = e;

		if (over && active.id !== over.id) {
			const newState = structuredClone(boardState);

			const activeData = active.data.current as SortableData;
			const overData = over.data.current as SortableData | undefined;

			const oldColumnId = activeData.sortable.containerId;
			const newColumnId = overData ? overData.sortable.containerId : over.id;

			const oldColumnIndex = newState.columns.findIndex(
				c => c.uuid === oldColumnId,
			);
			const newColumnIndex = newState.columns.findIndex(
				c => c.uuid === newColumnId,
			);

			const oldColumn = newState.columns[oldColumnIndex];
			const newColumn = newState.columns[newColumnIndex];

			const overIndex = overData
				? overData.sortable.index
				: newColumn.notes.length;

			oldColumn.notes.splice(activeData.sortable.index, 1);
			newColumn.notes.splice(overIndex, 0, activeData.note);
			newState.modified = true;

			setBoardState(newState);
		}
		setDragData(undefined);
	};

	return (
		<div
			{...props}
			className={`flex gap-3 p-4 bg-slate-100 dark:bg-slate-900 ${props.className ?? ""}`}
		>
			<DndContext
				onDragStart={onNoteDragStart}
				onDragEnd={onNoteDragEnd}
			>
				{boardState.columns.map((col, colId) => (
					<KanbanColumn
						key={col.uuid}
						column={col}
						className="flex-1"
						onNoteAdd={pos => onNoteAdd(colId, pos)}
						onNoteDelete={pos => onNoteDelete(colId, pos)}
						onNoteEdit={(pos, note) => onNoteEdit(colId, pos, note)}
					/>
				))}
				<DragOverlay>
					{dragData && <KanbanNote note={dragData.note} />}
				</DragOverlay>
			</DndContext>
		</div>
	);
}
