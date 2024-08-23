import React, { EventHandler } from "react";

import { Button, ButtonProps, Spinner, SpinnerProps } from "@nextui-org/react";

import { type PromisedFunction } from "@/lib/types";

export type ButtonEventHandler = EventHandler<React.UIEvent<HTMLButtonElement>>;
export type AsyncButtonProps = ButtonProps & {
	onHandle?: PromisedFunction<ButtonEventHandler>;
	eventName: keyof {
		[K in keyof ButtonProps]: ButtonProps[K] extends ButtonEventHandler
			? K
			: never;
	};
	spinnerProps?: SpinnerProps;
};

export default function AsyncButton(props: AsyncButtonProps) {
	const { eventName, onHandle, spinnerProps, ...buttonProps } = props;

	const [loading, setLoading] = React.useState(false);

	const handleOverride = async (e: React.UIEvent<HTMLButtonElement>) => {
		setLoading(true);
		if (onHandle) {
			await onHandle(e);
		}
		setLoading(false);
	};
	const propsOverrides = {
		[eventName]: handleOverride,
		...buttonProps,
	};

	return (
		<Button {...propsOverrides}>
			{loading ? <Spinner {...spinnerProps} /> : props.children}
		</Button>
	);
}
