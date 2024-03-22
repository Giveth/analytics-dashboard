export interface IMonthlyData {
	totalPerMonthAndYear: {
		total: number;
		date: string;
	}[];
}

export interface IResFormat extends IMonthlyData {
	total: number;
}

export interface IFetchProjectsCount {
	data: {
		projectsPerDate: IResFormat;
	};
}

export interface IFetchDonorsCount {
	data: {
		totalDonorsCountPerDate: IResFormat;
	};
}

export interface IFetchNewDonorsCount {
	data: {
		newDonorsCountPerDate: {
			total: number;
		};
	};
}

export interface IFetchDonationsCount {
	data: {
		totalDonationsNumberPerDate: IResFormat;
	};
}

export interface IFetchTotalDonationsUSD {
	data: {
		donationsTotalUsdPerDate: IResFormat;
	};
}

export interface IFetchTotalDonationsPerCategory {
	data: {
		totalDonationsPerCategory: ITotalDonationsPerCategory[];
	};
}

export interface ITotalDonationsPerCategory {
	title: string;
	totalUsd: number;
}
