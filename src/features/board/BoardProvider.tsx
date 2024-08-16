"use client";

import React from "react";

import GenericMutableProvider, {
	GenericMutableProviderContextType,
	GenericMutableProviderProps,
} from "@/components/GenericMutableProvider";
import type BoardSchema from "@/lib/schemas/board";

export type BoardState = (BoardSchema & { boardId: string }) | null;
export type BoardProviderProps = Omit<
	GenericMutableProviderProps<BoardState>,
	"context"
>;

const context = React.createContext<
	GenericMutableProviderContextType<BoardState>
>([null, () => null]);

export default function BoardProvider(props: BoardProviderProps) {
	return (
		<GenericMutableProvider
			context={context}
			{...props}
		/>
	);
}

export const useBoard = () => React.useContext(context);
