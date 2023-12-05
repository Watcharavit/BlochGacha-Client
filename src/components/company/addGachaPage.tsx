import React, { useState } from "react";
import { Card } from "@mui/material";
import { TextField, Button, Typography } from "@mui/material";
import FormCard from "@/components/company/formCard";
import { useSession } from "next-auth/react";

export function ItemCard(props: {
	order: string;
	name: string;
	rate: string;
	setName: any;
	setRate: any;
	handleAddItem: any;
}) {
	const { order, name, rate, setName, setRate } = props;
	return (
		<Card variant="outlined" style={{ padding: "20px", margin: "20px", width: "80%" }}>
			<Typography variant="h6">Item {order}</Typography>
			<TextField label={"Name"} variant="outlined" style={{ width: "70%" }} onChange={setName} value={name} />
			<TextField label={"Rate"} variant="outlined" style={{ width: "30%" }} onChange={setRate} value={rate} />
		</Card>
	);
}

export default function AddGachaPage() {
	const [name, setName] = useState("");
	const [price, setPrice] = useState("");
	const [items, setItems] = useState<{ name: string; rate: string }[]>([]);

	const { data: session } = useSession();

	const handleAddItem = (event: React.FormEvent) => {
		event.preventDefault();
		setItems([...items, { name: "", rate: "" }]);
	};

	const handleSubmit = async (event: React.FormEvent) => {
		event.preventDefault();
		// console.log(process.env.NEXT_PUBLIC_BACKEND_URL)
		console.log(items);
		if (!session) {
			alert("Please login");
			return;
		}

		// @ts-ignore
		const token = session.user?.token;
		console.log("Check Number");
		const priceNumber = parseInt(price);
		console.log(token);
		//@ts-ignore
		console.log(session.user?.role);

		if (isNaN(priceNumber)) {
			alert("Price must be a number");
			return;
		}
		const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/package/packages`, {
			method: "POST",
			headers: {
				Authorization: `Bearer ${token}`
			},
			body: JSON.stringify({ packageName: name, price: priceNumber, status: true })
		});
		const data0 = await res.json();
		const packageId = data0.packageID;
		console.log("Package", packageId, "Created");
		for (let i = 0; i < items.length; i++) {
			const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/package/items`, {
				method: "POST",
				headers: {
					Authorization: "Bearer " + token,
					"Content-Type": "application/json"
				},
				body: JSON.stringify({ itemName: items[i].name, itemRate: parseInt(items[i].rate) })
			});
			const data1 = await res.json();
			const itemId = data1.itemID;
			console.log("Item", itemId, "Created");
			const res2 = await fetch(
				`${process.env.NEXT_PUBLIC_BACKEND_URL}/package/packages/${packageId}/items/${itemId}`,
				{
					method: "POST",
					headers: {
						Authorization: "Bearer " + token,
						"Content-Type": "application/json"
					}
				}
			);
			console.log("Item", itemId, "Added to Package", packageId);
		}
		//success
		console.log("Package", packageId, "Created");
		setName("");
		setPrice("");
		setItems([]);
		alert("Package Created");

		// Handle form submission logic here
	};

	return (
		<div>
			<Typography variant="h1" component="h1" gutterBottom align="center">
				BlockGacha
			</Typography>
			<Typography variant="h3" component="h3" gutterBottom align="center">
				Add Gacha Form
			</Typography>
			<form onSubmit={handleSubmit} style={{ padding: "5" }}>
				<FormCard labelText="Name" value={name} onChange={(event) => setName(event.target.value)} />
				<FormCard labelText="Price" value={price} onChange={(event) => setPrice(event.target.value)} />

				{items.map((item, index) => (
					<ItemCard
						key={index}
						order={(index + 1).toString()}
						name={item.name}
						rate={item.rate}
						setName={(event: React.ChangeEvent<HTMLInputElement>) => {
							const updatedItems = [...items];
							updatedItems[index].name = event.target.value;
							setItems(updatedItems);
						}}
						setRate={(event: React.ChangeEvent<HTMLInputElement>) => {
							const updatedItems = [...items];
							updatedItems[index].rate = event.target.value;
							setItems(updatedItems);
						}}
						handleAddItem={handleAddItem}
					/>
				))}

				<Button
					type="button"
					variant="outlined"
					color="primary"
					style={{ margin: "40px", width: "120px" }}
					onClick={handleAddItem}
				>
					Add Item
				</Button>
				<br />
				<Button
					type="submit"
					variant="contained"
					color="primary"
					style={{ margin: "40px", width: "120px" }}
					onClick={handleSubmit}
				>
					Submit
				</Button>
			</form>
		</div>
	);
}
