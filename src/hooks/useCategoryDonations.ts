import { useEffect, useState } from 'react';
import { backendGQLRequest } from '../lib/requests';
import { fetchTotalDonationsPerCategory } from '../gql/gqlDonations';
import {
	IFetchTotalDonationsPerCategory,
	ITotalDonationsPerCategory,
} from '../types/gql';
import { formatDateToISO, showToastError } from '../lib/helpers';

const useCategoryDonations = (
	fromDate: Date,
	toDate: Date,
	fromOptimism?: boolean,
) => {
	const [categoryDonations, setCategoryDonations] =
		useState<ITotalDonationsPerCategory[]>();
	const [loading, setLoading] = useState<boolean>(true);

	useEffect(() => {
		!loading && setLoading(true);
		const variables = {
			fromDate: formatDateToISO(fromDate),
			toDate: formatDateToISO(toDate),
			fromOptimismOnly: fromOptimism || false,
		};
		backendGQLRequest(fetchTotalDonationsPerCategory, variables)
			.then((res: IFetchTotalDonationsPerCategory) => {
				const total = res.data.totalDonationsPerCategory;
				setCategoryDonations(total);
			})
			.catch(showToastError)
			.finally(() => setLoading(false));
	}, [fromDate, toDate, fromOptimism]);

	return { categoryDonations, loading };
};

export default useCategoryDonations;
