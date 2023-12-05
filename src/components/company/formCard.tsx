import React from "react";
import { Card, CardContent, Typography } from "@mui/material";
import { TextField } from "@mui/material";

interface FormCardProps {
	labelText: string;
	description?: string;
	value?: string;
	onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const FormCard: React.FC<FormCardProps> = ({ labelText, description = "", value = "", onChange = () => {} }) => {
	return (
		<Card variant="outlined" style={{ padding: "20px", margin: "20px", width: "80%" }}>
			<CardContent>
				<Typography variant="h5" component="div" padding={1}>
					{labelText}
				</Typography>
				<Typography variant="h6" style={{ color: "gray", fontSize: 14 }}>
					{description}
				</Typography>
				<TextField label={labelText} variant="outlined" style={{ width: "90%" }} onChange={onChange}>
					{value}
				</TextField>
			</CardContent>
		</Card>
	);
};

export default FormCard;
