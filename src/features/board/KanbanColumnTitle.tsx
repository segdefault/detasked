import React, { HTMLAttributes } from "react";

import { gochiHand } from "@/lib/fonts";
import { type ColumnSchema } from "@/lib/schemas/board";

export type KanbanColumnTitleProps = HTMLAttributes<HTMLDivElement> & {
	column: ColumnSchema;
};

export default function KanbanColumnTitle(props: KanbanColumnTitleProps) {
	const { column, ...divProps } = props;

	const className =
		`text-black text-5xl text-center content-center rounded-t-2xl ` +
		`${gochiHand.className} ${divProps.className ?? ""}`;

	return (
		<div
			{...divProps}
			style={{ backgroundColor: column.headerColor, ...divProps.style }}
			className={className}
		>
			{column.title.toUpperCase()}
		</div>
	);
}
