import React from "react";
import { Typography, Grid, Paper, Button } from "@mui/material";

export default function AllItemsPage() {
	return (
		<div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
			<Typography variant="h1" component="h1" gutterBottom>
				BlockGacha
			</Typography>
			<Typography variant="h4" align="center">
				Username
			</Typography>
			<Typography variant="h6" align="center">
				All Items
			</Typography>
			<Button variant="contained">Go Back</Button>
		</div>
	);
}
