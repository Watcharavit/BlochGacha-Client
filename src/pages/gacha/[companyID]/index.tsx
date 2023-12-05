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
	const [packageData, setPackageData] = React.useState({});
	const [reveal, setReveal] = React.useState<boolean[]>([]);

	const { data: session } = useSession();

	const router = useRouter();
	const { companyID } = router.query;

	useEffect(() => {
        if (!session || !token) {
            return; // Return early if there's no session or token
        }
		fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/account/${companyID}/packages`, {
			method: "GET",
			headers: {
				Authorization: "Bearer " + token
			}
		})
			.then((response) => response.json())
			.then((data) => {
				setCompanyData(data);
				setReveal(Array(data.length).fill(false));
			});
	}, [session]);
	
	if (!session) {
		return null;
	}
	//@ts-ignore
	const token = session?.user?.token;

	console.log(companyData);
	console.log(packageData);

    async function handleReveal(id: string, index: number) {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/package/packages/${id}`, {
            method: "GET",
            headers: {
                Authorization: "Bearer " + token
            }
        });
        const data = await res.json();
		
		const itemDetailsPromises = data.itemIDList.map(async (itemId: string) => {
			const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/package/items/${itemId}`, {
				method: "GET",
				headers: {
					Authorization: "Bearer " + token
				}
			});
			return response.json();
		})
		const itemsDetails = await Promise.all(itemDetailsPromises);
			
		setPackageData({
			...packageData,
			[id]: {
				...data,
				items: itemsDetails
			}
		});
        const updatedReveal = [...reveal];
        updatedReveal[index] = !updatedReveal[index];
        setReveal(updatedReveal);
		
	}

	async function handlePullGacha(id: string) {
		try{
			const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/package/packages/random/${id}`, {
				method: "POST",
				headers: {
					Authorization: "Bearer " + token
				}
			});
			
			const data = await res.json();
			
			if ("chainId" in data) {
				window.alert("success")
			} else {
				window.alert("unsuccess")
			}
			
			return data
		} catch (error) {
			window.alert("error"+error)
		}


	}

	// if (!companyData) return;
	return companyData.map((id: string, i: number) => {
		console.log(id)
			return (
		<Card key={i}>
			<CardContent>
				<Typography>Gacha No {i}</Typography>
				<Button
                    onClick={() => handleReveal(id,i)} // Pass the index as well
                >
                    {reveal[i] ? 'Hide Details' : 'Review'}
</Button> 
				<Button
					style={{ width: "20%", margin: "20px", fontSize: "1.5rem" }}
					onClick={() => handlePullGacha(id)}
				>
					Pull Gacha
				</Button>
				{reveal[i] && packageData[id] && (
					<div>
						<Typography>Statue: {packageData[id].packageStatus?"👍":"❌"}</Typography>
						<Typography>Name: {packageData[id].packageName}</Typography>
						<Typography>Price: {packageData[id].price}</Typography>
						{packageData[id].items.map((itemDetail) => (
							<Typography key={itemDetail.itemID}>
								Name: {itemDetail.itemName}, Rate: {itemDetail.itemRate}
							</Typography>
						))}
					</div>
				)}
			</CardContent>
		</Card>
	)});
}
