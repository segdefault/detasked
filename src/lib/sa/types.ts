export type ServerActionResult<E, C = undefined> =
	| (C extends undefined
			? { status: "success" }
			: { status: "success"; content: C })
	| { status: "error"; error: E };
