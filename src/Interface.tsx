export interface Item {
	id?: string;
	itemName: string;
	itemRate: number;
	itemPicture?: string;
}

export interface Package {
	id?: string;
	packageName: string;
	price: number;
	status: boolean;
}
