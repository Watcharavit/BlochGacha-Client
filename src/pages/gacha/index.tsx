import React, { useEffect } from "react";
import { Grid, Card, CardContent, Typography, CardMedia, IconButton } from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import { useRouter } from "next/router";
import GachaPage from "@/components/gacha/GachaPage";
import { useSession } from "next-auth/react";

const Page: React.FC = () => {
	const [companyData, setCompanyData] = React.useState([]);
	const { data: session } = useSession();

	useEffect(() => {
        if (!session || !token) {
            return; // Return early if there's no session or token
        }
		fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/account/allCompany`, {
			method: "GET",
			headers: {
				Authorization: "Bearer " + token
			}
		})
			.then((response) => response.json())
			.then((data) => setCompanyData(data))
			.catch((error) => console.error(error));
	}, [session]);

	if (!session) {
		return null;
	}
	//@ts-ignore
	const token = session?.user?.token;
	
	console.log(companyData);
	const cards = companyData?.map((company: any) => ({
		id: company.walletAddress,
		title: company.name
	}));
	return <GachaPage cards={cards} />;
};

export default Page;
