export default function generateString(length: number) {
	const key = crypto.randomUUID().replaceAll("-", "");

	if (length <= 0) {
		throw `Error: String length is negative or zero`;
	} else if (length > key.length) {
		throw `Unimplemented: String length larger than ${key.length}`;
	}

	return key.substring(key.length - length);
}
