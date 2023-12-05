import { Button } from "@mui/material";

export default function MyButton(text: string, onClick: any, color: string = "blue") {
	const style = {
		width: "50%",
		marginTop: "20px",
		fontSize: "1.5rem",
		color: color
	};
	return (
		<Button variant="contained" onClick={onClick} style={style}>
			{text}
		</Button>
	);
}
