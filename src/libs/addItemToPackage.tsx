export default async function addItemToPackage(token: string, itemID: string, packageID: string) {
	const NEXT_PUBLIC_BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
	if (!NEXT_PUBLIC_BACKEND_URL) throw new Error("Please define NEXT_PUBLIC_BACKEND_URL");

	const response = await fetch(`${NEXT_PUBLIC_BACKEND_URL}/package/packages/${packageID}/items/${itemID}`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			authorization: `Bearer ${token}`
		}
	});

	if (!response.ok) {
		throw new Error("Failed to add item to package");
	}

	return await response.json();
}
