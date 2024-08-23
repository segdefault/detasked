import kv from ".";
import { PRIVATE_KEY_LEN, type UserSchema } from "../schemas/user";
import generateString from "../utils/generate_string";
import hash from "../utils/hash";
import generateKvKey from "./generate_kv_key";

const PRIVATE_ID_PREFIX = "PRV";
const PUBLIC_ID_PREFIX = "PUB";
const BOOKMARKS_POSTFIX = "BMK";

const SALT_LEN = 16;

const buildPrivateIdKey = (prvId: string) => `${PRIVATE_ID_PREFIX}:${prvId}`;
const buildPublicIdKey = (pubId: string) => `${PUBLIC_ID_PREFIX}:${pubId}`;
const buildBookmarksKey = (prvId: string) =>
	`${PRIVATE_ID_PREFIX}:${prvId}:${BOOKMARKS_POSTFIX}`;

const userKv = {
	create: async () => {
		const { id: privateId, key: privateKey } = await generateKvKey(
			PRIVATE_KEY_LEN,
			buildPrivateIdKey,
		);
		const salt = generateString(SALT_LEN);
		const publicId = await hash(`${privateId}${salt}`);
		const publicKey = buildPublicIdKey(publicId);

		const user: UserSchema = {
			publicId,
		};

		await kv().set(privateKey, user);
		await kv().set(publicKey, privateId);

		return { privateId, publicId };
	},
	getBookmarks: async (prvId: string) => {
		const key = buildBookmarksKey(prvId);

		return await kv().smembers(key);
	},
	addBookmarks: async (prvId: string, ...bookmarkIds: string[]) => {
		const key = buildBookmarksKey(prvId);

		await kv().sadd(key, ...bookmarkIds);
	},
	deleteBookmarks: async (prvId: string, ...bookmarkIds: string[]) => {
		const key = buildBookmarksKey(prvId);

		await kv().srem(key, bookmarkIds);
	},
};

export default userKv;
