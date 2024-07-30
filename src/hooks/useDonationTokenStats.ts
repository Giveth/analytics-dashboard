import { useEffect, useState } from 'react';
import { backendGQLRequest } from '../lib/requests';
import { IDonationTokenStats, IFetchDonationTokenStats } from '../types/gql';
import { formatDateToISO, showToastError } from '../lib/helpers';
import { fetchDonationTokenStats } from '../gql/gqlDonations';

const useDonationTokenStats = (
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
		backendGQLRequest(fetchDonationTokenStats, variables)
			.then((res: IFetchDonationTokenStats) => {
				setTokenStats(res.data.getDonationStats);
			})
			.catch(showToastError)
			.finally(() => setLoading(false));
	}, [fromDate, toDate, selectedNetworkId]);

	return { tokenStats, loading };
};

export default useDonationTokenStats;
