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

export interface IFetchNewDonorsDonationTotalUsd {
	data: {
		newDonorsDonationTotalUsdPerDate: {
			total: number;
		};
	};
}

export interface IFetchDonationsCount {
	data: {
		totalDonationsNumberPerDate: IResFormat;
	};
}

export interface IDonationTokenStats {
	currency: string;
	uniqueDonorCount: number;
	currencyPercentage: number;
}

export interface IFetchDonationTokenStats {
	data: {
		getDonationStats: IDonationTokenStats[];
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

export interface IDonationBoxMetrics {
	totalDonationsToGiveth: number;
	totalUsdValueToGiveth: number;
	averagePercentageToGiveth: number;
}

export interface IRecurringDonationdPerTokenRecord {
	token: string;
	total: number;
}

export interface IResFormatPerToken extends IResFormat {
	totalPerToken: IRecurringDonationdPerTokenRecord[];
}

export interface IFetchReccuringDonationsCount {
	data: {
		recurringDonationsCountPerDate: IResFormatPerToken;
	};
}

export interface IFetchRecurringDonationsTotalUSD {
	data: {
		recurringDonationsTotalStreamedUsdPerDate: IResFormatPerToken;
	};
}

export interface IVouchCountPerMonth {
	countWithComments: number;
	countWithoutComments: number;
	totalCount: number;
	date: string;
}

export interface IVouchCountInfo {
	total: number;
	totalPerMonth: IVouchCountPerMonth[];
}

export interface IFetchVouchesCountRes {
	data: {
		getOrganisationVouchCountByDate: IVouchCountInfo;
	};
}
