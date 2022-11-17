import { useEffect, useState } from 'react';
import { backendGQLRequest } from '../lib/requests';
import { IFetchTotalDonationsUSD } from '../types/gql';
import { formatDateToISO } from '../lib/helpers';
import { fetchTotalDonationsUSD } from '../gql/gqlDonations';

const useTotalDonations = (fromDate: Date, toDate: Date) => {
	const [totalDonations, setTotalDonations] = useState<string>();
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
				setTotalDonations(total);
			})
			.finally(() => setLoading(false));
	}, [fromDate, toDate]);

	return { totalDonations, loading };
};

export default useTotalDonations;
