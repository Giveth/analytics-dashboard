import { useEffect, useState } from 'react';
import { backendGQLRequest } from '../lib/requests';
import { IFetchTotalDonationsUSD, IResFormat } from '../types/gql';
import { formatDateToISO, showToastError } from '../lib/helpers';
import { fetchTotalDonationsUSD } from '../gql/gqlDonations';

const useTotalDonations = (
	fromDate: Date,
	toDate: Date,
	selectedNetworkId?: number,
	onlyVerified?: boolean,
) => {
	const [totalDonations, setTotalDonations] = useState<IResFormat>();
	const [loading, setLoading] = useState<boolean>(true);

	useEffect(() => {
		!loading && setLoading(true);
		const variables = {
			fromDate: formatDateToISO(fromDate),
			toDate: formatDateToISO(toDate),
			networkId: selectedNetworkId,
			onlyVerified,
		};
		backendGQLRequest(fetchTotalDonationsUSD, variables)
			.then((res: IFetchTotalDonationsUSD) => {
				const total = res.data.donationsTotalUsdPerDate;
				setTotalDonations(total);
			})
			.catch(showToastError)
			.finally(() => setLoading(false));
	}, [fromDate, toDate, selectedNetworkId, onlyVerified]);

	return { totalDonations, loading };
};

export default useTotalDonations;
