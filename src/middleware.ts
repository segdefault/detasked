import { NextRequest } from "next/server";

import sessionMiddleware from "@/lib/middleware/session_middleware";
import stackMiddleware from "@/lib/middleware/stack_middleware";
import rootRedirectMiddleware from "./lib/middleware/root_redirect_middleware";

const middlewares = [sessionMiddleware, rootRedirectMiddleware];

export default async function middleware(request: NextRequest) {
	return await stackMiddleware(request, middlewares);
}
