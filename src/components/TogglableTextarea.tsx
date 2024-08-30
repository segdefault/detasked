"use client";

import React from "react";

export type TogglableTextareaProps = Omit<
	React.TextareaHTMLAttributes<HTMLTextAreaElement>,
	"value" | "onDoubleClick" | "onBlur" | "onChange" | "onKeyUp" | "onToggle"
> & {
	value?: string;
	onCommit?: (value: string) => void;
	onToggle?: (editable: boolean) => void;
};

export default function TogglableTextarea(props: TogglableTextareaProps) {
	const {
		className: classNameOverrides,
		onCommit,
		value,
		onToggle,
		...otherProps
	} = props;

	const [editable, setEditable] = React.useState(false);
	const [pendingValue, setPendingValue] = React.useState(value ?? "");

	const className =
		`${editable ? "cursor-text" : "cursor-pointer"} ` + classNameOverrides;

	React.useEffect(() => setPendingValue(value ?? ""), [value]);

	const enable = () => setEditable(true);
	const rollback = () => {
		setPendingValue(value ?? "");
		setEditable(false);
	};
	const submitText = () => {
		onCommit?.(pendingValue);
		setEditable(false);
	};
	const onKeyUp = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
		if (e.key == "Escape") {
			e.stopPropagation();
			rollback();
		}
	};
	const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) =>
		setPendingValue(e.target.value);

	React.useEffect(() => onToggle?.(editable), [editable, onToggle]);

	return (
		<textarea
			readOnly={!editable}
			onDoubleClick={enable}
			onBlur={submitText}
			onChange={onChange}
			className={className}
			onKeyUp={onKeyUp}
			value={pendingValue}
			{...otherProps}
		/>
	);
}
