export default async function proposeTrade (traderAddress:string,offerItemID:string,requestItemID:string,token:string) {
	const NEXT_PUBLIC_BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
	if (!NEXT_PUBLIC_BACKEND_URL) throw new Error("Please define NEXT_PUBLIC_BACKEND_URL");
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/trade/proposed`, {
        method: "POST",  
        headers: {
            Authorization: "Bearer " + token ,
			"Content-Type": "application/json"

        },
        body: JSON.stringify({
            requestTo: traderAddress,
            proposeItemID: offerItemID, 
            requestItemID: requestItemID
        })
    })
    const data = await res.json();

    return data;

}