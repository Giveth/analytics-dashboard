import { useEffect, useState } from 'react';
import { backendGQLRequest } from '../lib/requests';
import {
	IFetchRecurringDonationsTotalUSD,
	IResFormatPerToken,
} from '../types/gql';
import { formatDateToISO, showToastError } from '../lib/helpers';
import { fetchRecurringDonationsTotalUSD } from '../gql/gqlRecurringDonations';

const useRecurringDonationsTotalUsd = (
	fromDate: Date,
	toDate: Date,
	selectedNetworkId?: number,
	onlyVerified?: boolean,
) => {
	const [
		recurringDonationsTotaStreanedlUsd,
		setRecurringDonationsTotaStreanedlUsd,
	] = useState<IResFormatPerToken>();
	const [loading, setLoading] = useState<boolean>(true);

	useEffect(() => {
		!loading && setLoading(true);
		const variables = {
			fromDate: formatDateToISO(fromDate),
			toDate: formatDateToISO(toDate),
			networkId: selectedNetworkId,
			onlyVerified,
		};
		backendGQLRequest(fetchRecurringDonationsTotalUSD, variables)
			.then((res: IFetchRecurringDonationsTotalUSD) => {
				setRecurringDonationsTotaStreanedlUsd(
					res.data.recurringDonationsTotalStreamedUsdPerDate,
				);
			})
			.catch(showToastError)
			.finally(() => setLoading(false));
	}, [fromDate, toDate, selectedNetworkId, onlyVerified]);

	return { recurringDonationsTotaStreanedlUsd, loading };
};

export default useRecurringDonationsTotalUsd;
