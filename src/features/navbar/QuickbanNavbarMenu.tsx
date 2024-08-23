import React from "react";

import { NavbarMenu, NavbarMenuProps } from "@nextui-org/react";

import NewBookmarkButton from "./NewBookmarkButton";
import QuickbanBookmarkList from "./QuickbanBookmarkList";

export type QuickbanNavbarMenuProps = Omit<NavbarMenuProps, "children">;

export default function QuickbanNavbarMenu(props: QuickbanNavbarMenuProps) {
	const { className: classNameOverrides, ...otherProps } = props;

	const className = "flex flex-col w-1/4 p-0" + ` ${classNameOverrides ?? ""}`;

	return (
		<NavbarMenu
			className={className}
			{...otherProps}
		>
			<QuickbanBookmarkList className="flex-1 overflow-y-auto min-h-0" />
			<NewBookmarkButton />
		</NavbarMenu>
	);
}
