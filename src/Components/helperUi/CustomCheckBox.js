import { Checkbox } from "@mui/material";
import React from "react";

const CustomCheckBox = ({ onClick, value }) => {
	// const [isChecked, setIsChecked] = React.useState(false);
	const [isChecked, setIsChecked] = React.useState(value);

	return (
		<Checkbox
			checked={value}
			onChange={(e) => {
				setIsChecked(!isChecked);
				setTimeout(() => {
					setIsChecked(false);
				}, 600);
			}}
			onClick={onClick}
		/>
	);
};

export default CustomCheckBox;
