import { useEffect, useState } from 'react';
import { BackendVersion, statsGQLRequest } from '../lib/requests';
import { IFetchNewDonorsDonationTotalUsd } from '../types/gql';
import { formatDateToISO, showToastError } from '../lib/helpers';
import { fetchNewDonorsDonationTotalUsd } from '../gql/gqlDonors';

const useNewDonorsDonationTotalUsd = (
	version: BackendVersion,
	fromDate: Date,
	toDate: Date,
) => {
	const [newDonorsDonationTotalUsd, setNewDonorsDonationTotalUsd] =
		useState<number>();
	const [loading, setLoading] = useState<boolean>(true);

	useEffect(() => {
		!loading && setLoading(true);
		const variables = {
			fromDate: formatDateToISO(fromDate),
			toDate: formatDateToISO(toDate),
		};
		statsGQLRequest(version, fetchNewDonorsDonationTotalUsd, variables)
			.then((res: IFetchNewDonorsDonationTotalUsd) => {
				setNewDonorsDonationTotalUsd(
					res.data.newDonorsDonationTotalUsdPerDate.total,
				);
			})
			.catch(showToastError)
			.finally(() => setLoading(false));
	}, [fromDate, toDate, version]);

	return { newDonorsDonationTotalUsd, loading };
};

export default useNewDonorsDonationTotalUsd;
