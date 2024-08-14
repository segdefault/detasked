import QuickSingleton from "./quick_singleton";

const textEncoder = new QuickSingleton(() => new TextEncoder()).getter();

export default async function hash(msg: string): Promise<string> {
	const msgUint8 = textEncoder().encode(msg);
	const hashBuffer = await crypto.subtle.digest("SHA-256", msgUint8);
	const hashArray = Array.from(new Uint8Array(hashBuffer)); // convert buffer to byte array
	const hashHex = hashArray.map(b => b.toString(16).padStart(2, "0")).join(""); // convert bytes to hex string

	return hashHex;
}
