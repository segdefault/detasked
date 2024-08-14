import { NextRequest } from "next/server";

import sessionMiddleware from "@/lib/middleware/session_middleware";
import stackMiddleware from "@/lib/middleware/stack_middleware";

const middlewares = [sessionMiddleware];

export default async function middleware(request: NextRequest) {
	return await stackMiddleware(request, middlewares);
}
