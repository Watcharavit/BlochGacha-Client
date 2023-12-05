import React, { useState, ChangeEvent, FormEvent } from "react";
import { Card, TextField, Button, Typography } from "@mui/material";
import FormCard from "@/components/company/formCard";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import createItem from "@/libs/createItem";
import addItemToPackage from "@/libs/addItemToPackage";
import createPackage from "@/libs/createPackage";

interface ItemCardProps {
	order: string;
	name: string;
	rate: string;
	onNameChange: (event: ChangeEvent<HTMLInputElement>) => void;
	onRateChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const ItemCard: React.FC<ItemCardProps> = ({ order, name, rate, onNameChange, onRateChange }) => (
	<Card variant="outlined" className="itemCard">
		<Typography variant="h6">Item {order}</Typography>
		<TextField label="Name" variant="outlined" onChange={onNameChange} value={name} />
		<TextField label="Rate" variant="outlined" onChange={onRateChange} value={rate} />
	</Card>
);
/*
<Card variant="outlined" style={{ padding: "20px", margin: "20px", width: "80%" }}>
    <Typography variant="h6">Item {order}</Typography>
    <TextField label={"Name"} variant="outlined" style={{ width: "70%" }} onChange={setName} value={name} />
    <TextField label={"Rate"} variant="outlined" style={{ width: "30%" }} onChange={setRate} value={rate} />
</Card>
*/

export default function AddGachaPage() {
	const { data: session } = useSession();
	const router = useRouter();
	const [name, setName] = useState<string>("");
	const [price, setPrice] = useState<string>("");
	const [items, setItems] = useState<{ itemName: string; itemRate: string }[]>([]);

	if (!session) {
		return <>Please Log IN</>;
	}

	const handleAddItem = (event: FormEvent) => {
		event.preventDefault();
		setItems([...items, { itemName: "", itemRate: "" }]);
	};

	const handleSubmit = async (event: FormEvent) => {
		event.preventDefault();

		if (!session) {
			alert("Please Log In First");
			return;
		}
		// @ts-ignore
		if (session.user.role !== "company") {
			alert("User do not have permission");
			return;
		}

		try {
			if (price && name) {
				const createPackageResponse = await createPackage(session.user.token, {
					packageName: name,
					price: parseInt(price),
					status: true
				});

				if (!createPackageResponse?.success) {
					throw new Error("Failed to create package");
				}

				const packageID = createPackageResponse.packageID;
				console.log("Package", packageID, "Created");

				for (const item of items) {
					const createItemResponse = await createItem(session.user.token, {
						itemName: item.itemName,
						itemRate: parseInt(item.itemRate)
					});

					if (!createItemResponse?.success) {
						throw new Error(`Failed to create item ${item.itemName}`);
					}

					const itemID = createItemResponse.itemID;
					console.log("Item", itemID, "Created");
					const addItemToPackageResponse = await addItemToPackage(session.user.token, itemID, packageID);

					if (!addItemToPackageResponse?.success) {
						throw new Error(`Failed to add item ${item.itemName} to package`);
					}

					console.log("Item", itemID, "Added to Package", packageID);
				}
				alert("Add package and items success");
				router.push("/");
			} else {
				alert("Please enter price and name");
				throw new Error("Please enter price and name");
			}
		} catch (error) {
			console.log(error);
		}
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
						name={item.itemName}
						rate={item.itemRate}
						onNameChange={(event: React.ChangeEvent<HTMLInputElement>) => {
							setItems((currentItems) => {
								const newItems = [...currentItems];
								newItems[index].itemName = event.target.value;
								return newItems;
							});
						}}
						onRateChange={(event: React.ChangeEvent<HTMLInputElement>) => {
							setItems((currentItems) => {
								const newItems = [...currentItems];
								newItems[index].itemRate = event.target.value;
								return newItems;
							});
						}}
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
