import kv from ".";
import generateString from "../utils/generate_string";

export default async function generateKvKey(
	length: number,
	// eslint-disable-next-line no-unused-vars
	keyBuilder?: (id: string) => string,
): Promise<{ id: string; key: string }> {
	let id: string;
	let key: string;

	do {
		id = generateString(length);
		key = keyBuilder ? keyBuilder(id) : id;
	} while ((await kv().exists(key)) > 0);

	return { id, key };
}
