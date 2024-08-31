"use client";

import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

import { buildBoardPageUrl } from "@/lib/paths";
import { updateBoardSa } from "@/lib/sa/board";
import { deleteBookmarkSa } from "@/lib/sa/user";
import { useBoard } from "../board/BoardProvider";
import { useBookmarks } from "./BookmarksProvider";
import DetaskedBookmarkItem from "./DetaskedBookmarkItem";

export type DetaskedBookmarkListProps = Omit<
	React.HTMLAttributes<HTMLDivElement>,
	"children"
>;

export default function DetaskedBookmarkList(props: DetaskedBookmarkListProps) {
	const [bookmarks, setBookmarks] = useBookmarks();
	const [boardState, setBoardState] = useBoard();
	const router = useRouter();

	const className =
		"divide-y divide-solid divide-foreground/20" + ` ${props.className}`;

	const onNavigate = (i: number) => () =>
		router.push(buildBoardPageUrl(bookmarks[i].id));
	const onTitleUpdate = (i: number) => async (title: string) => {
		try {
			const res = await updateBoardSa(bookmarks[i].id, { title });

			if (res.status == "error") {
				toast("Failed :/");
				return;
			}
		} catch {
			toast("Network Error :/");
			return;
		}

		// If editing the title of the open board
		if (bookmarks[i].id === boardState?.boardId) {
			setBoardState({
				...boardState,
				title,
			});
		}

		setBookmarks(bs => {
			bs[i] = { ...bs[i], title };

			return bs;
		});
	};
	const onDelete = (i: number) => async () => {
		const boardId = bookmarks[i].id;

		await deleteBookmarkSa(boardId);
		setBookmarks(bs => {
			bs.splice(i, 1);

			if (boardId === boardState?.boardId) {
				if (bs.length === 0) {
					setBoardState(null);
				} else {
					console.log(bs[0].id);
					router.push(buildBoardPageUrl(bs[0].id));
				}
			}

			return bs;
		});
	};

	if (bookmarks.length === 0) {
		return (
			<div
				{...props}
				className={
					"flex flex-col justify-center items-center divide-y-0 " + className
				}
			>
				<span>:/</span>
				<span>No bookmarks</span>
			</div>
		);
	}

	return (
		<div
			{...props}
			className={className}
		>
			{bookmarks.map((b, i) => (
				<DetaskedBookmarkItem
					key={b.id}
					boardItem={b}
					className="h-20 px-4"
					onNavigate={onNavigate(i)}
					onTitleUpdate={onTitleUpdate(i)}
					onDelete={onDelete(i)}
				/>
			))}
		</div>
	);
}
