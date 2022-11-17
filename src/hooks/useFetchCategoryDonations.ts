import { useEffect, useState } from 'react';
import { backendGQLRequest } from '../lib/requests';
import { fetchTotalDonationsPerCategory } from '../gql/gqlDonations';
import {
	IFetchTotalDonationsPerCategory,
	ITotalDonationsPerCategory,
} from '../types/gql';
import { formatDateToISO } from '../lib/helpers';

const useFetchCategoryDonations = (fromDate: Date, toDate: Date) => {
	const [categoryDonations, setCategoryDonations] =
		useState<ITotalDonationsPerCategory[]>();
	const [loading, setLoading] = useState<boolean>(true);

	useEffect(() => {
		!loading && setLoading(true);
		const variables = {
			fromDate: formatDateToISO(fromDate),
			toDate: formatDateToISO(toDate),
		};
		backendGQLRequest(fetchTotalDonationsPerCategory, variables)
			.then((res: IFetchTotalDonationsPerCategory) => {
				const total = res.data.totalDonationsPerCategory;
				setCategoryDonations(total);
			})
			.finally(() => setLoading(false));
	}, [fromDate, toDate]);

	return { categoryDonations, loading };
};

export default useFetchCategoryDonations;
