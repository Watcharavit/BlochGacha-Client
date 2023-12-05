import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const ProfilePage = () => {
	const [accountData, setAccountData] = useState(null);
	const { data: session } = useSession();
	//@ts-ignore
	const token = session?.user?.token;
	console.log(token);

	useEffect(() => {
		fetch("http://localhost:5400/account", {
			method: "GET",
			headers: {
				Authorization: "Bearer " + token
			}
		})
			.then((response) => response.json())
			.then((data) => setAccountData(data))
			.catch((error) => console.error(error));
	}, []);

	if (!session) {
		return null; // Render nothing while redirecting
	}

	return (
		<div>
			<h1>Profile Page</h1>
			<p>{JSON.stringify(session.user)}</p>
			{accountData ? <p>{JSON.stringify(accountData, null, 2)}</p> : <p>Loading...</p>}
		</div>
	);
};

export default ProfilePage;
