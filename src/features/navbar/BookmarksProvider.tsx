"use client";

import React from "react";

import GenericMutableProvider, {
	GenericMutableProviderContextType,
	GenericMutableProviderProps,
} from "@/components/GenericMutableProvider";
import { type BoardItemSchema } from "@/lib/schemas/board";

export type BoardProviderProps = Omit<
	GenericMutableProviderProps<BoardItemSchema[]>,
	"context"
>;

const context = React.createContext<
	GenericMutableProviderContextType<BoardItemSchema[]>
>([[], () => null]);

export default function BookmarksProvider(props: BoardProviderProps) {
	return (
		<GenericMutableProvider
			context={context}
			{...props}
		/>
	);
}

export const useBookmarks = () => React.useContext(context);
