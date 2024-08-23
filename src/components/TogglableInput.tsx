import React from "react";

export type ToggleInputProps = Omit<
	React.InputHTMLAttributes<HTMLInputElement>,
	"value" | "onDoubleClick" | "onBlur" | "onChange" | "onKeyUp" | "onToggle"
> & {
	value?: string;
	onCommit?: (newValue: string) => void;
	onToggle?: (editing: boolean) => void;
};

export default function TogglableInput(props: ToggleInputProps) {
	const {
		value,
		onCommit,
		onToggle,
		className: classNameOverrides,
		...inputProps
	} = props;

	const [editing, setEditable] = React.useState(false);
	const [pendingValue, setPendingValue] = React.useState(value ?? "");

	const className =
		`${editing ? " cursor-text" : "cursor-pointer outline-none"} ` +
		classNameOverrides;

	const enable = () => setEditable(true);
	const rollback = () => {
		setPendingValue(value ?? "");
		setEditable(false);
	};
	const submitText = () => {
		onCommit?.(pendingValue);
		setEditable(false);
	};
	const onKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === "Escape") {
			e.stopPropagation();
			rollback();
		} else if (e.key === "Enter") {
			e.stopPropagation();
			submitText();
		}
	};
	const onChange = (e: React.ChangeEvent<HTMLInputElement>) =>
		setPendingValue(e.target.value);

	React.useEffect(() => onToggle?.(editing), [editing, onToggle]);

	return (
		<input
			readOnly={!editing}
			onDoubleClick={enable}
			onBlur={submitText}
			onChange={onChange}
			className={className}
			onKeyUp={onKeyUp}
			value={pendingValue}
			{...inputProps}
		/>
	);
}
