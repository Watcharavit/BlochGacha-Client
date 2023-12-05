import React from "react";
import { Button, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { signOut } from "next-auth/react";

export default function UserNavigatePage() {
	const router = useRouter();

	const handleGachaClick = () => {
		router.push("/gacha");
	};

	const handleMarketplaceClick = () => {
		router.push("/marketplace");
	};

	const handleAllItemsClick = () => {
		router.push("/profile");
	};

	return (
		<div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
			<Typography variant="h1" component="h1" gutterBottom>
				BlockGacha
			</Typography>
			<Button
				variant="contained"
				size="large"
				color="primary"
				style={{ width: "50%", marginTop: "20px", fontSize: "1.5rem" }}
				onClick={handleGachaClick}
			>
				Gacha
			</Button>
			<Button
				variant="outlined"
				size="large"
				color="primary"
				style={{ width: "50%", marginTop: "20px", fontSize: "1.5rem" }}
				onClick={handleMarketplaceClick}
			>
				Marketplace
			</Button>
			<Button
				variant="contained"
				size="large"
				color="primary"
				style={{ width: "50%", marginTop: "20px", fontSize: "1.5rem" }}
				onClick={handleAllItemsClick}
			>
				Your Profile
			</Button>
			<Button
				variant="outlined"
				size="large"
				color="primary"
				style={{ width: "50%", marginTop: "20px", fontSize: "1.5rem" }}
				onClick={() => router.push("/itemget")}
			>
				View Item Info
			</Button>
			<Button
				variant="contained"
				size="large"
				color="primary"
				style={{ width: "50%", marginTop: "20px", fontSize: "1.5rem" }}
				onClick={() => {
					signOut();
				}}
			>
				Log Out
			</Button>
		</div>
	);
}
