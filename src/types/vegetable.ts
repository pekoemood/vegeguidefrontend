export type Vegetable = {
	id: string;
	attributes: {
		id: number;
		name: string;
		description: string;
		origin: string;
		storage: string;
		image_url: string;
		latest_price: {
			latest_price: number;
		};
		compare_last_month: {
			compare_price: number;
		}
		monthly_prices: {
				month: string;
				average_price: number;
			}[];
		nutritions: {
				name: string;
				amount: string;
				unit: string;
			}[];
		seasons: {
				start_month: number;
				end_month: number;
				note: string;
				in_season: boolean;
			}[];
	}
}

export type VegetablesLoaderData = {
	data: Vegetable[];
	meta: {
		total_pages: number;
		current_page: number;
	};
};

export type VegetablesResponse = {
	data: Vegetable;
};