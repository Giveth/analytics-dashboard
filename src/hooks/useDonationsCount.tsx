import { useEffect, useState } from 'react';
import { backendGQLRequest } from '../lib/requests';
import { IFetchDonationsCount, IResFormat } from '../types/gql';
import { formatDateToISO, showToastError } from '../lib/helpers';
import { fetchDonationsCount } from '../gql/gqlDonations';

const useDonationsCount = (
	fromDate: Date,
	toDate: Date,
	fromOptimism?: boolean,
) => {
	const [donationsCount, setDonationsCount] = useState<IResFormat>();
	const [loading, setLoading] = useState<boolean>(true);

	useEffect(() => {
		!loading && setLoading(true);
		const variables = {
			fromDate: formatDateToISO(fromDate),
			toDate: formatDateToISO(toDate),
			fromOptimism: fromOptimism || false,
		};
		backendGQLRequest(fetchDonationsCount, variables)
			.then((res: IFetchDonationsCount) => {
				setDonationsCount(res.data.totalDonationsNumberPerDate);
			})
			.catch(showToastError)
			.finally(() => setLoading(false));
	}, [fromDate, toDate, fromOptimism]);

	return { donationsCount, loading };
};

export default useDonationsCount;
