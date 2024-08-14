import "server-only";

import {
	RequestCookies,
	ResponseCookies,
} from "next/dist/compiled/@edge-runtime/cookies";
import { cookies } from "next/headers";
import { type NextRequest, type NextResponse } from "next/server";

import userKv from "../kv/user";

export const SESSION_COOKIE_KEY = "_SESSION";

export function getSessionId(jars?: (RequestCookies | ResponseCookies)[]) {
	const jarsSession = jars
		?.map(j => j.get(SESSION_COOKIE_KEY)?.value)
		.reduce((a, b) => a ?? b);
	const requestSession = cookies().get(SESSION_COOKIE_KEY)?.value;

	return jarsSession ?? requestSession;
}

export default async function sessionMiddleware(
	request: NextRequest,
	response: NextResponse,
): Promise<NextResponse> {
	if (!request.cookies.has(SESSION_COOKIE_KEY)) {
		const { privateId } = await userKv.create();

		response.cookies.set(SESSION_COOKIE_KEY, privateId, {
			secure: true,
			sameSite: true,
		});
	}

	return response;
}
