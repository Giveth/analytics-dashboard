import { useEffect, useState } from 'react';
import { BackendVersion, statsGQLRequest } from '../lib/requests';
import { IDonationBoxMetrics } from '../types/gql';
import { formatDateToISO, showToastError } from '../lib/helpers';
import { fetchDonationBoxMetrics } from '../gql/gqlDonations';

const useDonationBoxMetrics = (
	version: BackendVersion,
	fromDate: Date,
	toDate: Date,
) => {
	const [donationMetrics, setDonationMetrics] =
		useState<IDonationBoxMetrics | null>(null);
	const [loading, setLoading] = useState<boolean>(true);

	useEffect(() => {
		setLoading(true);
		const variables = {
			fromDate: formatDateToISO(fromDate),
			toDate: formatDateToISO(toDate),
		};
		statsGQLRequest(version, fetchDonationBoxMetrics, variables)
			.then(res => {
				if (res.errors) {
					throw new Error(res.errors[0].message);
				}
				setDonationMetrics(res.data.donationMetrics);
			})
			.catch(showToastError)
			.finally(() => setLoading(false));
	}, [fromDate, toDate, version]);

	return { donationMetrics, loading };
};

export default useDonationBoxMetrics;
