import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Button, IconButton, Typography } from "@mui/material";
import { ArrowBack } from "@mui/icons-material";

const ProfilePage = () => {
	const [accountData, setAccountData] = useState(null);
    const [unredeemedName, setUnRedeemedName] = useState<string[]>([]);
    const [redeemedName, setRedeemedName] = useState<string[]>([]);

	const { data: session } = useSession();
	//@ts-ignore
	const token = session?.user?.token;
    
    const getItemName = async (itemId:string) => {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/package/items/${itemId}`, {
            method: "GET",
            headers: {
				Authorization: "Bearer " + token
			}
		})
        const data = await res.json(); 
        return data.itemName;

    }
	useEffect(() => {
		const fetchData = () => {
			console.log("Fetching data...");


			fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/account`, {
				method: "GET",
				headers: {
					Authorization: "Bearer " + token
				}
			})
				.then((response) => response.json())
				.then((data) => {
                    setAccountData(data)
                    const unredeemed = data.unredeemedItemIDs.map((itemID: string) => getItemName(itemID));
                    const redeemed = data.redeemedItemIDs.map((itemID: string) => getItemName(itemID));
                    Promise.all(unredeemed).then((values) => setUnRedeemedName(values));
                    Promise.all(redeemed).then((values) => setRedeemedName(values));
                    

                })
				.catch((error) => console.error(error));



		};

		// Set the delay (in milliseconds) for the fetchData function
		const delay = 5000; // Delay for 5 seconds, for example

		// Set a timeout to call fetchData after the specified delay
		const timer = setTimeout(fetchData, delay);

		// Clear the timeout if the component unmounts
		return () => clearTimeout(timer);
	}, [accountData,unredeemedName,redeemedName]);

	const router = useRouter();

	const handleGoBack = () => {
		router.back();
	};

	const handleRedeem = (itemID: string) => {
		fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/account/items/${itemID}`, {
			method: "PUT",
			headers: {
				Authorization: "Bearer " + token
			}
		});
		console.log("redeemed");
	};
	if (!session) {
		return null; // Render nothing while redirecting
	}

	return (
		<div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
			<IconButton onClick={handleGoBack} style={{ position: "absolute", top: 10, left: 10 }}>
				<ArrowBack />
			</IconButton>
			<Typography variant="h1" component="h1" gutterBottom>
				BlockGacha
			</Typography>
			<Typography variant="h4" align="center">
				Welcome {session.user?.name}
			</Typography>

			<div>
				<Typography variant="h6">
					Token Balance:{" "}
					{
						// @ts-ignore
						accountData?.tokenBalance
					}
				</Typography>
				<Typography variant="h6">Unredeemed Items</Typography>
				<table style={{ padding: "10px" }}>
					<thead>
						<tr>
							<th>Item ID</th>
							<th>Item Name</th>
                            <th> </th>

						</tr>
					</thead>
					<tbody>
						{
							// @ts-ignore
							accountData?.unredeemedItemIDs?.map((itemID: any,index:number) => (
								<tr key={itemID}>
									<td style={{ padding: "10px" }}>{itemID}</td>
									<td style={{ padding: "10px" }}>{unredeemedName[index]}</td>
									<td style={{ padding: "10px" }}>
										<Button
											variant="contained"
											color="primary"
											onClick={() => handleRedeem(itemID)}
										>
											Redeem
										</Button>
									</td>
								</tr>
							)) ?? (
								<tr>
									<td>No unredeemed items</td>
								</tr>
							)
						}
					</tbody>
				</table>
				<Typography variant="h6">Redeemed Items</Typography>
				<table style={{ padding: "10px" }}>
					<thead>
						<tr>
							<th>Item ID</th>
							<th>Item Name</th>

						</tr>
					</thead>
					<tbody>
						{
							// @ts-ignore
							accountData?.redeemedItemIDs?.map((itemID: any,index: number) => (
								<tr key={itemID}>
									<td>{itemID}</td>
									<td style={{ padding: "10px" }}>{redeemedName[index]}</td>

								</tr>
							)) ?? (
								<tr>
									<td>No unredeemed items</td>
								</tr>
							)
						}
					</tbody>
				</table>

				<Typography variant="h6">Proposed Trade</Typography>
				<table style={{ padding: "10px" }}>
					<thead>
						<tr>
							<th>Trade ID</th>
						</tr>
					</thead>
					<tbody>
						{
							// @ts-ignore
							accountData?.proposeTradeIDs?.map((itemID: any) => (
								<tr key={itemID}>
									<td>{itemID}</td>
								</tr>
							)) ?? (
								<tr>
									<td>No unredeemed items</td>
								</tr>
							)
						}
					</tbody>
				</table>

				<Typography variant="h6">Requested Trade</Typography>
				<table style={{ padding: "10px" }}>
					<thead>
						<tr>
							<th>Trade ID</th>
						</tr>
					</thead>
					<tbody>
						{
							// @ts-ignore
							accountData?.requestedTradeIDs?.map((itemID: any) => (
								<tr key={itemID}>
									<td>{itemID}</td>
								</tr>
							)) ?? (
								<tr>
									<td>No unredeemed items</td>
								</tr>
							)
						}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default ProfilePage;
