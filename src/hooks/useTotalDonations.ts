import { useEffect, useState } from 'react';
import { backendGQLRequest } from '../lib/requests';
import { IFetchTotalDonationsUSD, IResFormat } from '../types/gql';
import { formatDateToISO, showToastError } from '../lib/helpers';
import { fetchTotalDonationsUSD } from '../gql/gqlDonations';

const useTotalDonations = (
	fromDate: Date,
	toDate: Date,
	fromOptimism?: boolean,
) => {
	const [totalDonations, setTotalDonations] = useState<IResFormat>();
	const [loading, setLoading] = useState<boolean>(true);

	useEffect(() => {
		!loading && setLoading(true);
		const variables = {
			fromDate: formatDateToISO(fromDate),
			toDate: formatDateToISO(toDate),
			fromOptimismOnly: fromOptimism || false,
		};
		backendGQLRequest(fetchTotalDonationsUSD, variables)
			.then((res: IFetchTotalDonationsUSD) => {
				const total = res.data.donationsTotalUsdPerDate;
				setTotalDonations(total);
			})
			.catch(showToastError)
			.finally(() => setLoading(false));
	}, [fromDate, toDate, fromOptimism]);

	return { totalDonations, loading };
};

export default useTotalDonations;
