import { ArrowBack } from "@mui/icons-material";
import { Button, Card, CardContent, IconButton, Typography } from "@mui/material";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React from "react";
import { useEffect } from "react";


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
        try {
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
            window.alert("error" + error)
        }


    }

	const cardStyle = {
		margin: "20px",
		padding: "20px",
		width: "80%"
	};
    // if (!companyData) return;
    return (
        <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
			<Typography variant="h1" component="h1" gutterBottom align="center">
				BlockGacha
			</Typography>
			<IconButton href='/' style={{ position: "absolute", top: 10, left: 10 }}>
				<ArrowBack />
			</IconButton>     
            <Typography variant="h4" component="h4" gutterBottom align="center">
				Gachas
			</Typography>       
            {
                companyData.map((id: string, i: number) => {
                    console.log(id)
                    return (
                        <Card key={i} style={cardStyle}>
                            <CardContent>
                                <Typography>Gacha No {i}</Typography>
                                <Button
                                    onClick={() => handleReveal(id, i)} // Pass the index as well
                                >
                                    {reveal[i] ? 'Hide Details' : 'Review'}
                                </Button>
                                <Button
                                    style={{ width: "20%", margin: "20px", fontSize: "1.5rem" }}
                                    onClick={() => handlePullGacha(id)}
                                >
                                    Pull Gacha
                                </Button>
                                {/* @ts-ignore */}
                                {reveal[i] && packageData[id] && (
                                    <div>
                                        { /*@ts-ignore*/}
                                        <Typography>Status: {packageData[id].packageStatus ? "👍" : "❌"}</Typography>
                                        { /*@ts-ignore*/}
                                        <Typography>Gacha Name: {packageData[id].packageName}</Typography>
                                        { /*@ts-ignore*/}
                                        <Typography>Price: {packageData[id].price}</Typography>
                                        <Typography>Items</Typography>
                                        { /*@ts-ignore*/}
                                        {packageData[id].items.map((itemDetail) => (
                                            <Typography key={itemDetail.itemID}>
                                                Item Name: {itemDetail.itemName}, Rate: {itemDetail.itemRate}
                                            </Typography>
                                        ))}
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    )
                })
            }
        </div>
    )
}
