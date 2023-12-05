import React from "react";
import { Typography, Button } from "@mui/material";
import { useSession, signIn, signOut } from "next-auth/react";

export default function Home() {
	const buttonStyle = {
		width: "200px",
		margin: "20px",
		fontSize: "1.5rem"
	};
	return (
		<div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
			<Typography variant="h1" component="h1" align="center">
				BlockGacha
			</Typography>
			<Typography variant="h6" align="center">
				Gacha on Blockchain, Free of exploits
			</Typography>
			<br />
			<br />
			<br />
			<br />
			<Typography variant="h6" align="center">
				Sign in of you already have an account
			</Typography>
			<Button variant="contained" color="primary" onClick={() => signIn()} style={buttonStyle}>
				Login
			</Button>
			<Typography variant="h6" align="center">
				Or register if you do not have one
			</Typography>
			<Button variant="contained" color="primary" href="/register" style={buttonStyle}>
				Register
			</Button>
		</div>
	);
}
