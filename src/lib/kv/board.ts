import kv from ".";
import { BOARD_ID_LEN, type BoardSchema } from "../schemas/board";
import generateKvKey from "./generate_kv_key";

const BOARD_PREFIX_KEY = "BRD";

const buildBoardKey = (id: string) => `${BOARD_PREFIX_KEY}:${id}`;

const boardKv = {
	create: async (board: BoardSchema) => {
		const { id, key } = await generateKvKey(BOARD_ID_LEN, buildBoardKey);

		await kv().hset(key, board);

		return id;
	},
	get: async (boardId: string) => {
		const key = buildBoardKey(boardId);

		return (await kv().hgetall(key)) as BoardSchema;
	},
	update: async (boardId: string, board: BoardSchema) => {
		const key = buildBoardKey(boardId);

		return await kv().hset(key, board);
	},
};

export default boardKv;
