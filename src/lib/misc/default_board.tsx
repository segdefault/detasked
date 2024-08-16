import { type BoardSchema } from "../schemas/board";

const defaultBoard: BoardSchema = {
	title: "New Board",
	columns: [
		{
			uuid: crypto.randomUUID(),
			title: "backlog",
			headerColor: "#f48897",
			notes: [
				{
					uuid: crypto.randomUUID(),
					content: "Add a new note",
				},
				{
					uuid: crypto.randomUUID(),
					content: "Edit a note",
				},
			],
		},
		{
			uuid: crypto.randomUUID(),
			title: "todo",
			headerColor: "#f4e688",
			notes: [
				{
					uuid: crypto.randomUUID(),
					content: "Delete a note",
				},
			],
		},
		{
			uuid: crypto.randomUUID(),
			title: "doing",
			headerColor: "#88f48e",
			notes: [
				{
					uuid: crypto.randomUUID(),
					content: "Add a new board",
				},
			],
		},
		{
			uuid: crypto.randomUUID(),
			title: "done",
			headerColor: "#88e2f4",
			notes: [],
		},
	],
};

export default defaultBoard;
