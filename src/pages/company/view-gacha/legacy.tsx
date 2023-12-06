import { ArrowBack } from "@mui/icons-material";
import { Button, Card, CardContent, IconButton, Typography } from "@mui/material";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React from "react";
import { useEffect } from "react";

export default function ViewGachaPage() {
	const [companyData, setCompanyData] = React.useState([]);
	const [reveal, setReveal] = React.useState(false);
	const [hiddenText, setHiddenText] = React.useState<string[]>([]);
	const { data: session } = useSession();
	if (!session) {
		return null;
	}
	//@ts-ignore
	const token = session?.user?.token;
	//@ts-ignore
	const walletAddress = session?.user?.walletAddress;



	useEffect(() => {
		
		fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/account/${walletAddress}/packages`, {
			method: "GET",
			headers: {
				Authorization: "Bearer " + token
			}
		})
			.then((response) => response.json())
			.then((data) => {
				setCompanyData(data);
			});



	}, []);

	const handleReveal = async (packageID:string) => {
		const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/package/packages/${packageID}`, {
			method: "GET",
			headers: {
				Authorization: "Bearer " + token
			}
		});
		const data = await res.json();
		const retStr = [`Package Name : ${data.packageName}`, `Package Price : ${data.price}`,`Package Items : ${data.itemIDList}`];
		setHiddenText(retStr);
		setReveal(true);
	}

	const cardStyle = {
		margin: "20px",
		padding: "20px",
		width: "80%"
	};
	return (
		<div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
			<Typography variant="h1" component="h1" gutterBottom align="center">
				BlockGacha
			</Typography>
			<IconButton href='/' style={{ position: "absolute", top: 10, left: 10 }}>
				<ArrowBack />
			</IconButton>
			{
			reveal && <Card  style={cardStyle}>
				<CardContent>
					<Typography variant="h6">Package Info</Typography>
					{
					hiddenText.map((item: string, i: number) => (
					<Typography key={i} style={{wordWrap: "break-word"}}>{item}</Typography>)
					)}
				</CardContent>
			</Card>
			}
			{
			companyData.map((item: any, i: number) => (
			<Card key={i} style={cardStyle}>
				<CardContent>
					<Typography>Gacha No {i}</Typography>
					<Typography>Gacha ID {item}</Typography>
					<Button onClick={() => handleReveal(item)}>Reveal</Button> {/* Add reveal button */}

				</CardContent>
			</Card>)
			)}
		
	
		</div>
	)
	;
}
