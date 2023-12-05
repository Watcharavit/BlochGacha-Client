import { Package } from "@/Interface";

export default async function createPackage(token: string, _package: Package) {
	const NEXT_PUBLIC_BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
	if (!NEXT_PUBLIC_BACKEND_URL) throw new Error("Please define NEXT_PUBLIC_BACKEND_URL");

	const response = await fetch(`${NEXT_PUBLIC_BACKEND_URL}/package/packages`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			authorization: `Bearer ${token}`
		},
		body: JSON.stringify(_package)
	});

	if (!response.ok) {
		throw new Error("Failed to create package");
	}

	return await response.json();
}
