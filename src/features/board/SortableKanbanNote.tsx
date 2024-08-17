import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import KanbanNote, { KanbanNoteProps } from "./KanbanNote";

export default function SortableKanbanNote(props: KanbanNoteProps) {
	const { style: styleOverrides, note, ...otherProps } = props;
	const { attributes, listeners, setNodeRef, transform, transition } =
		useSortable({ id: note.uuid, data: { note } });

	const style = {
		transform: CSS.Transform.toString(transform),
		transition,
		...styleOverrides,
	};

	return (
		<KanbanNote
			{...otherProps}
			style={style}
			note={note}
			ref={setNodeRef}
			{...attributes}
			moveNoteListeners={listeners}
		/>
	);
}
