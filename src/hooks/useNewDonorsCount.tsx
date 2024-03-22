import { useEffect, useState } from 'react';
import { backendGQLRequest } from '../lib/requests';
import { IFetchNewDonorsCount } from '../types/gql';
import { formatDateToISO, showToastError } from '../lib/helpers';
import { fetchNewDonorsCount } from '../gql/gqlDonors';

const useNewDonorsCount = (fromDate: Date, toDate: Date) => {
	const [newDonorsCount, setNewDonorsCount] = useState<number>();
	const [loading, setLoading] = useState<boolean>(true);

	useEffect(() => {
		!loading && setLoading(true);
		const variables = {
			fromDate: formatDateToISO(fromDate),
			toDate: formatDateToISO(toDate),
		};
		backendGQLRequest(fetchNewDonorsCount, variables)
			.then((res: IFetchNewDonorsCount) => {
				setNewDonorsCount(res.data.newDonorsCountPerDate.total);
			})
			.catch(showToastError)
			.finally(() => setLoading(false));
	}, [fromDate, toDate]);

	return { newDonorsCount, loading };
};

export default useNewDonorsCount;
