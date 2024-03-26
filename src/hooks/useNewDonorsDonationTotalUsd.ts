import { useEffect, useState } from 'react';
import { backendGQLRequest } from '../lib/requests';
import { IFetchNewDonorsDonationTotalUsd } from '../types/gql';
import { formatDateToISO, showToastError } from '../lib/helpers';
import { fetchNewDonorsDonationTotalUsd } from '../gql/gqlDonors';

const useNewDonorsDonationTotalUsd = (fromDate: Date, toDate: Date) => {
	const [newDonorsDonationTotalUsd, setNewDonorsDonationTotalUsd] =
		useState<number>();
	const [loading, setLoading] = useState<boolean>(true);

	useEffect(() => {
		!loading && setLoading(true);
		const variables = {
			fromDate: formatDateToISO(fromDate),
			toDate: formatDateToISO(toDate),
		};
		backendGQLRequest(fetchNewDonorsDonationTotalUsd, variables)
			.then((res: IFetchNewDonorsDonationTotalUsd) => {
				setNewDonorsDonationTotalUsd(
					res.data.newDonorsDonationTotalUsdPerDate.total,
				);
			})
			.catch(showToastError)
			.finally(() => setLoading(false));
	}, [fromDate, toDate]);

	return { newDonorsDonationTotalUsd, loading };
};

export default useNewDonorsDonationTotalUsd;
