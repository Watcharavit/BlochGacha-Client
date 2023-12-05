import { Button, Card, CardContent, Typography } from "@mui/material";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React from "react";
import { useEffect } from "react";

// async function fetchPackageData(packageID: string, token: string) {
//     const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/package/packages/${ids.join(',')}`, {
//         method: 'GET',
//         headers: {
//             Authorization: 'Bearer ' + token,
//         },
//     })
//     const data = await res.json();
//     return data;
// }

export default function CompanyGachaPage() {
	const [companyData, setCompanyData] = React.useState([]);
	// const [packageData, setPackageData] = React.useState([]);

	const { data: session } = useSession();
	if (!session) {
		return null;
	}
	//@ts-ignore
	const token = session?.user?.token;

	const router = useRouter();
	const { companyID } = router.query;

	useEffect(() => {
		fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/account/${companyID}/packages`, {
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

	const [reveal, setReveal] = React.useState(Array(companyData.length).fill(false));
	console.log(companyData);
	// console.log(packageData);

	async function handlePullGacha(id: string) {
		const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/package/packages/${id}`, {
			method: "GET",
			headers: {
				Authorization: "Bearer " + token
			}
		});
		const data = await res.json();
		console.log(data);
		// setPackageData(data);
	}
	return companyData.map((item: any, i: number) => (
		<Card key={i}>
			<CardContent>
				<Typography>Gacha No {i}</Typography>
				<Button>Reveal</Button> {/* Add reveal button */}
				<Button
					style={{ width: "20%", margin: "20px", fontSize: "1.5rem" }}
					onClick={() => handlePullGacha(item)}
				>
					Pull Gacha
				</Button>
			</CardContent>
		</Card>
	));
}
