import kv from ".";
import { type BoardSchema } from "../schemas/board";
import generateKvKey from "./generate_kv_key";

const BOARD_PREFIX_KEY = "BRD";

const BOARD_KEY_LEN = 16;

const buildBoardKey = (id: string) => `${BOARD_PREFIX_KEY}:${id}`;

const boardKv = {
	create: async (board: BoardSchema) => {
		const { id, key } = await generateKvKey(BOARD_KEY_LEN, buildBoardKey);

		await kv().hset(key, board);

		return id;
	},
};

export default boardKv;
