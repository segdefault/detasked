import { createClient } from "@vercel/kv";

import QuickSingleton from "../utils/quick_singleton";

const createInstance = () =>
	createClient({
		url: process.env.KV_REST_API_URL,
		token: process.env.KV_REST_API_TOKEN,
		enableTelemetry: false,
	});

const kv = new QuickSingleton(createInstance).getter();

export default kv;
