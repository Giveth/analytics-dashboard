import { useEffect, useState } from 'react';
import { backendGQLRequest } from '../lib/requests';
import { IDonationBoxMetrics } from '../types/gql';
import { formatDateToISO, showToastError } from '../lib/helpers';
import { fetchDonationBoxMetrics } from '../gql/gqlDonations';

const useDonationBoxMetrics = (fromDate: Date, toDate: Date) => {
	const [donationMetrics, setDonationMetrics] =
		useState<IDonationBoxMetrics | null>(null);
	const [loading, setLoading] = useState<boolean>(true);

	useEffect(() => {
		setLoading(true);
		const variables = {
			fromDate: formatDateToISO(fromDate),
			toDate: formatDateToISO(toDate),
		};
		backendGQLRequest(fetchDonationBoxMetrics, variables)
			.then(res => {
				setDonationMetrics(res.data.donationMetrics);
			})
			.catch(showToastError)
			.finally(() => setLoading(false));
	}, [fromDate, toDate]);

	return { donationMetrics, loading };
};

export default useDonationBoxMetrics;
