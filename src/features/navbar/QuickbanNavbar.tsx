import { SaveFilled, UndoOutlined } from "@ant-design/icons";
import {
	Navbar,
	NavbarContent,
	NavbarMenuToggle,
	NavbarProps as NextUINavbarProps,
} from "@nextui-org/react";

import ThemeSwitcher from "@/components/ThemeSwitcher";
import { gochiHand } from "@/lib/fonts";
import BoardTitle from "../board/BoardTitle";
import SaveBoardModificationsButton from "../board/SaveBoardModificationsButton";
import UndoBoardModificationsButton from "../board/UndoBoardModificationsButton";
import QuickbanNavbarMenu from "./QuickbanNavbarMenu";

export type QuickbanNavbarProps = Omit<NextUINavbarProps, "children">;

export default async function QuickbanNavbar(props: QuickbanNavbarProps) {
	const className = `bg-primary dark:bg-slate-800 ${props.className}`;

	return (
		<Navbar
			maxWidth="full"
			{...props}
			className={className}
		>
			<NavbarContent>
				<NavbarMenuToggle />
				<p className={`text-2xl ${gochiHand.className}`}>Quickban</p>
			</NavbarContent>
			<NavbarContent
				className="flex-1"
				justify="center"
			>
				<BoardTitle className="text-4xl" />
			</NavbarContent>
			<NavbarContent
				justify="end"
				className="gap-8"
			>
				<div>
					<UndoBoardModificationsButton
						variant="light"
						size="lg"
						isIconOnly
					>
						<UndoOutlined />
					</UndoBoardModificationsButton>
					<SaveBoardModificationsButton
						variant="light"
						size="lg"
						isIconOnly
					>
						<SaveFilled />
					</SaveBoardModificationsButton>
				</div>
				<ThemeSwitcher />
			</NavbarContent>
			<QuickbanNavbarMenu />
		</Navbar>
	);
}
