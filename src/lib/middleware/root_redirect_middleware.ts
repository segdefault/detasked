import { NextResponse, type NextRequest } from "next/server";

import boardKv from "../kv/board";
import userKv from "../kv/user";
import defaultBoard from "../misc/default_board";
import { getSessionId } from "./session_middleware";

// Runs when no board was specified to access
export default async function rootRedirectMiddleware(
	request: NextRequest,
	response: NextResponse,
): Promise<NextResponse> {
	if (request.nextUrl.pathname != "/") {
		return response;
	}

	const privateId = getSessionId([response.cookies, request.cookies]);

	if (!privateId) {
		// Session middleware should always run before this one
		throw "Unexpected state: session is null";
	}

	const bookmarkIds = await userKv.getBookmarks(privateId);
	let bookmarkId;

	// If no bookmarks, create a new board,
	// otherwise, select the first board from the bookmarks set
	if (bookmarkIds.length == 0) {
		bookmarkId = await boardKv.create(defaultBoard);

		await userKv.addBookmarks(privateId, bookmarkId);
	} else {
		bookmarkId = bookmarkIds[0];
	}

	const url = `/board/${bookmarkId}`;

	const newResponse = NextResponse.redirect(new URL(url, request.url), {
		...response,
		status: 303,
	});

	response.cookies.getAll().forEach(cookie => {
		newResponse.cookies.set(cookie);
	});

	return newResponse;
}
