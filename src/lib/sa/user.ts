"use server";

import boardKv from "../kv/board";
import userKv from "../kv/user";
import { getSessionId } from "../middleware/session_middleware";
import defaultBoard from "../misc/default_board";
import { BoardItemSchema } from "../schemas/board";
import { PrivateIdSchema, UserSchemaError } from "../schemas/user";
import { ServerActionResult } from "./types";

export async function createBookmarkSa(): Promise<
	ServerActionResult<UserSchemaError.INVALID_PRIVATE_ID, BoardItemSchema>
> {
	const privateId = getSessionId() ?? "";
	const { success: validId } = PrivateIdSchema.safeParse(privateId);

	if (!validId) {
		return { status: "error", error: UserSchemaError.INVALID_PRIVATE_ID };
	}

	const boardId = await boardKv.create(defaultBoard);
	const boardItem = { id: boardId, title: defaultBoard.title };

	await userKv.addBookmarks(privateId, boardId);

	return { status: "success", content: boardItem };
}

export async function deleteBookmarkSa(boardId: string) {
	const privateId = getSessionId();
	const privateIdValid = PrivateIdSchema.safeParse(privateId).success;

	if (!privateId || !privateIdValid) {
		return;
	}

	await userKv.deleteBookmarks(privateId, boardId);
	await boardKv.delete(boardId);
}

export async function getBookmarksSa(): Promise<
	ServerActionResult<UserSchemaError.INVALID_PRIVATE_ID, BoardItemSchema[]>
> {
	const privateId = getSessionId() ?? "";
	const { success: validId } = PrivateIdSchema.safeParse(privateId);

	if (!validId) {
		return { status: "error", error: UserSchemaError.INVALID_PRIVATE_ID };
	}

	const bookmarks = (
		await Promise.all(
			(await userKv.getBookmarks(privateId)).map(boardKv.getItem),
		)
	).filter(b => typeof b !== "undefined");

	return { status: "success", content: bookmarks };
}
