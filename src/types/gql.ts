export interface IFetchProjectsCount {
	data: {
		projectsPerDate: number;
	};
}

export interface IFetchDonorsCount {
	data: {
		totalDonorsCountPerDate: number;
	};
}

export interface IFetchTotalDonationsUSD {
	data: {
		donationsTotalUsdPerDate: number;
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
