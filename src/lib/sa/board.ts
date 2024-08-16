"use server";

import boardKv from "../kv/board";
import { BoardIdSchema } from "../schemas/board";

export async function getBoardSa(boardId: string) {
	const { success: validId } = BoardIdSchema.safeParse(boardId);

	if (!validId) {
		return null;
	}

	return await boardKv.get(boardId);
}
