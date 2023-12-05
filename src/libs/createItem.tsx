import { Item } from "@/Interface";

export default async function createItem(token: string, item: Item) {
	const NEXT_PUBLIC_BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
	if (!NEXT_PUBLIC_BACKEND_URL) throw new Error("Please define NEXT_PUBLIC_BACKEND_URL");

	const response = await fetch(`${NEXT_PUBLIC_BACKEND_URL}/package/items`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			authorization: `Bearer ${token}`
		},
		body: JSON.stringify(item)
	});

	if (!response.ok) {
		throw new Error("Failed to create item");
	}

	return await response.json();
}
