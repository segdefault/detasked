import { SaveFilled } from "@ant-design/icons";
import {
	NavbarContent,
	Navbar as NextUINavbar,
	NavbarProps as NextUINavbarProps,
} from "@nextui-org/react";

import ThemeSwitcher from "@/components/ThemeSwitcher";
import { gochiHand } from "@/lib/fonts";
import BoardTitle from "../board/BoardTitle";
import SaveBoardModificationsButton from "../board/SaveBoardModificationsButton";

export type NavbarProps = Omit<NextUINavbarProps, "children">;

export default function Navbar(props: NavbarProps) {
	const className = `bg-primary dark:bg-slate-800 ${props.className}`;

	return (
		<NextUINavbar
			maxWidth="full"
			{...props}
			className={className}
		>
			<NavbarContent>
				<p className={`text-2xl ${gochiHand.className}`}>Quickban</p>
			</NavbarContent>
			<NavbarContent
				className="flex-1"
				justify="center"
			>
				<BoardTitle className="text-4xl" />
			</NavbarContent>
			<NavbarContent justify="end">
				<SaveBoardModificationsButton variant="light" size="lg" isIconOnly>
					<SaveFilled />
				</SaveBoardModificationsButton>
				<ThemeSwitcher />
			</NavbarContent>
		</NextUINavbar>
	);
}
