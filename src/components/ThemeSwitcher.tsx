"use client";

import React from "react";

import MoonOutlinedIcon from "@ant-design/icons/MoonOutlined";
import SunOutlinedIcon from "@ant-design/icons/SunOutlined";
import { Switch } from "@nextui-org/react";
import { useTheme } from "next-themes";

export default function ThemeSwitcher() {
	const { theme, setTheme } = useTheme();
	const [mounted, setMounted] = React.useState(false);

	const isDark = theme == "dark";

	const toggleTheme = () => setTheme(isDark ? "light" : "dark");

	React.useEffect(() => {
		setMounted(true);
	}, []);

	if (!mounted) return null;

	return (
		<Switch
			color="secondary"
			isSelected={isDark}
			onValueChange={toggleTheme}
			thumbIcon={({ isSelected, className }) =>
				isSelected ? (
					<MoonOutlinedIcon className={className} />
				) : (
					<SunOutlinedIcon className={className} />
				)
			}
		/>
	);
}
