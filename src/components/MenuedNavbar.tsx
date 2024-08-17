"use client";

import React from "react";

import { Navbar, NavbarProps } from "@nextui-org/react";

export type MenuedNavbarProps = Omit<NavbarProps, "onMenuOpenChange">;

export default function MenuedNavbar(props: MenuedNavbarProps) {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const [_, setIsMenuOpen] = React.useState(false);

	return (
		<Navbar
			onMenuOpenChange={setIsMenuOpen}
			{...props}
		/>
	);
}
