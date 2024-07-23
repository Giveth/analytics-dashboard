import { useEffect, useState } from 'react';
import { backendGQLRequest } from '../lib/requests';
import {
	IFetchReccuringDonationsCount,
	IResFormatPerToken,
} from '../types/gql';
import { formatDateToISO, showToastError } from '../lib/helpers';
import { fetchRecurringDonationsCount } from '../gql/gqlRecurringDonations';

const useRecurringDonationsCount = (
	fromDate: Date,
	toDate: Date,
	selectedNetworkId?: number,
	onlyVerified?: boolean,
) => {
	const [recurringDonationsCount, setRecurringDonationsCount] =
		useState<IResFormatPerToken>();
	const [loading, setLoading] = useState<boolean>(true);

	useEffect(() => {
		!loading && setLoading(true);
		const variables = {
			fromDate: formatDateToISO(fromDate),
			toDate: formatDateToISO(toDate),
			networkId: selectedNetworkId,
			onlyVerified,
		};
		backendGQLRequest(fetchRecurringDonationsCount, variables)
			.then((res: IFetchReccuringDonationsCount) => {
				setRecurringDonationsCount(
					res.data.recurringDonationsCountPerDate,
				);
			})
			.catch(showToastError)
			.finally(() => setLoading(false));
	}, [fromDate, toDate, selectedNetworkId, onlyVerified]);

	return { recurringDonationsCount, loading };
};

export default useRecurringDonationsCount;
