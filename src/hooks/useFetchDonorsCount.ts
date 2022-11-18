import { useEffect, useState } from 'react';
import { backendGQLRequest } from '../lib/requests';
import { IFetchDonorsCount } from '../types/gql';
import { formatDateToISO } from '../lib/helpers';
import { fetchDonorsCount } from '../gql/gqlDonors';

const useFetchDonorsCount = (fromDate: Date, toDate: Date) => {
	const [donorsCount, setDonorsCount] = useState<number>();
	const [loading, setLoading] = useState<boolean>(true);

	useEffect(() => {
		!loading && setLoading(true);
		const variables = {
			fromDate: formatDateToISO(fromDate),
			toDate: formatDateToISO(toDate),
		};
		backendGQLRequest(fetchDonorsCount, variables)
			.then((res: IFetchDonorsCount) => {
				setDonorsCount(res.data.totalDonorsCountPerDate);
			})
			.finally(() => setLoading(false));
	}, [fromDate, toDate]);

	return { donorsCount, loading };
};

export default useFetchDonorsCount;
