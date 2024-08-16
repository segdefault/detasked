"use client";

import React from "react";

export type GenericMutableProviderContextType<T> = [
	T,
	React.Dispatch<React.SetStateAction<T>>,
];
export type GenericMutableProviderProps<T> = {
	context: React.Context<GenericMutableProviderContextType<T>>;
	initialValue: T;

	children: React.ReactNode;
};

export default function GenericMutableProvider<T>(
	props: GenericMutableProviderProps<T>,
) {
	const { context, initialValue, children } = props;

	const [state, setState] = React.useState<T>(initialValue);

	return (
		<context.Provider value={[state, setState]}>{children}</context.Provider>
	);
}
