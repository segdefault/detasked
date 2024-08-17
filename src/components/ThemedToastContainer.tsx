"use client";

import { useTheme } from "next-themes";
import { ToastContainer, ToastContainerProps } from "react-toastify";

export default function ThemedToastContainer(
	props: Omit<ToastContainerProps, "theme">,
) {
	const { theme } = useTheme();

	return (
		<ToastContainer
			theme={theme}
			{...props}
		/>
	);
}
