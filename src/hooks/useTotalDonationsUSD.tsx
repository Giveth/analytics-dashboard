import { useEffect, useState } from 'react';
import { backendGQLRequest } from '../lib/requests';
import { IFetchTotalDonationsUSD } from '../types/gql';
import { formatDateToISO } from '../lib/helpers';
import { fetchTotalDonationsUSD } from '../gql/gqlDonations';

const useTotalDonationsUSD = (fromDate: Date, toDate: Date) => {
	const [totalDonationsUSD, setTotalDonationsUSD] = useState<string>();
	const [loading, setLoading] = useState<boolean>(true);

	useEffect(() => {
		!loading && setLoading(true);
		const variables = {
			fromDate: formatDateToISO(fromDate),
			toDate: formatDateToISO(toDate),
		};
		backendGQLRequest(fetchTotalDonationsUSD, variables)
			.then((res: IFetchTotalDonationsUSD) => {
				const total = res.data.donationsTotalUsdPerDate.toFixed(0);
				setTotalDonationsUSD(total);
			})
			.finally(() => setLoading(false));
	}, [fromDate, toDate]);

	return [totalDonationsUSD, loading];
};

export default useTotalDonationsUSD;
