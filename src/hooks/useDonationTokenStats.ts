import { useEffect, useState } from 'react';
import { BackendVersion, statsGQLRequest } from '../lib/requests';
import { IDonationTokenStats, IFetchDonationTokenStats } from '../types/gql';
import { formatDateToISO, showToastError } from '../lib/helpers';
import { fetchDonationTokenStats } from '../gql/gqlDonations';

const useDonationTokenStats = (
	version: BackendVersion,
	fromDate: Date,
	toDate: Date,
	selectedNetworkId?: number,
) => {
	const [tokenStats, setTokenStats] = useState<IDonationTokenStats[]>();
	const [loading, setLoading] = useState<boolean>(true);

	useEffect(() => {
		!loading && setLoading(true);
		const variables = {
			fromDate: formatDateToISO(fromDate),
			toDate: formatDateToISO(toDate),
			networkId: selectedNetworkId,
		};
		statsGQLRequest(version, fetchDonationTokenStats, variables)
			.then((res: IFetchDonationTokenStats) => {
				setTokenStats(res.data.getDonationStats);
			})
			.catch(showToastError)
			.finally(() => setLoading(false));
	}, [fromDate, toDate, selectedNetworkId, version]);

	return { tokenStats, loading };
};

export default useDonationTokenStats;
