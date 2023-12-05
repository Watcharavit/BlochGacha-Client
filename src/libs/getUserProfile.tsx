export default async function getUserProfile(token: string) {
	const NEXT_PUBLIC_BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
	if (!NEXT_PUBLIC_BACKEND_URL) throw new Error("Please define NEXT_PUBLIC_SERVER_URL");

	const response = await fetch(`${NEXT_PUBLIC_BACKEND_URL}/api/v1/auth/me`, {
		method: "GET",
		headers: {
			authorization: `Bearer ${token}`
		}
	});

	if (!response.ok) {
		throw new Error("Failed to fetch user profile");
	}
	return await response.json();
}
