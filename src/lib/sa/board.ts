"use server";

import boardKv from "../kv/board";
import BoardSchema, { BoardIdSchema, BoardSchemaError } from "../schemas/board";
import { ServerActionResult } from "./types";

const isProduction = process.env.NODE_ENV == "production";

export async function getBoardSa(
	boardId: string,
): Promise<ServerActionResult<BoardSchemaError, BoardSchema>> {
	const { success: validId, error } = BoardIdSchema.safeParse(boardId);

	if (!validId) {
		return {
			status: "error",
			error: isProduction
				? BoardSchemaError.UNK
				: (error as unknown as BoardSchemaError),
		};
	}

	const board = await boardKv.get(boardId);

	return {
		status: "success",
		content: board,
	};
}

export async function updateBoardSa(
	boardId: string,
	board: Partial<BoardSchema>,
): Promise<ServerActionResult<BoardSchemaError>> {
	const { success: validId, error: idError } = BoardIdSchema.safeParse(boardId);
	const { success: validBoard, error: boardError } =
		BoardSchema.partial().safeParse(board);

	if (!validId) {
		return {
			status: "error",
			error: idError.message as unknown as BoardSchemaError,
		};
	} else if (!validBoard) {
		return {
			status: "error",
			error: boardError.message as unknown as BoardSchemaError,
		};
	}

	await boardKv.update(boardId, board);

	return { status: "success" };
}
