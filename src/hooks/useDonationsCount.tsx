import { useEffect, useState } from 'react';
import { backendGQLRequest } from '../lib/requests';
import { IFetchDonationsCount, IResFormat } from '../types/gql';
import { formatDateToISO } from '../lib/helpers';
import { fetchDonationsCount } from '../gql/gqlDonations';

const useDonationsCount = (fromDate: Date, toDate: Date) => {
	const [donationsCount, setDonationsCount] = useState<IResFormat>();
	const [loading, setLoading] = useState<boolean>(true);

	useEffect(() => {
		!loading && setLoading(true);
		const variables = {
			fromDate: formatDateToISO(fromDate),
			toDate: formatDateToISO(toDate),
		};
		backendGQLRequest(fetchDonationsCount, variables)
			.then((res: IFetchDonationsCount) => {
				setDonationsCount(res.data.totalDonationsNumberPerDate);
			})
			.finally(() => setLoading(false));
	}, [fromDate, toDate]);

	return { donationsCount, loading };
};

export default useDonationsCount;
