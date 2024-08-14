import { type BoardSchema } from "../schemas/board";

const defaultBoard: BoardSchema = {
	title: "New Board",
	columns: [
		{
			title: "backlog",
			headerColor: "#f48897",
			notes: [
				{
					content: "Add a new note",
				},
				{
					content: "Edit a note",
				},
			],
		},
		{
			title: "todo",
			headerColor: "#f4e688",
			notes: [
				{
					content: "Delete a note",
				},
			],
		},
		{
			title: "doing",
			headerColor: "#88f48e",
			notes: [
				{
					content: "Add a new board",
				},
			],
		},
		{
			title: "done",
			headerColor: "#88e2f4",
			notes: [],
		},
	],
};

export default defaultBoard;
