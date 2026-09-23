import { useEffect, useState } from 'react';
import { BackendVersion, statsGQLRequest } from '../lib/requests';
import { fetchTotalDonationsPerCategory } from '../gql/gqlDonations';
import {
	IFetchTotalDonationsPerCategory,
	ITotalDonationsPerCategory,
} from '../types/gql';
import { formatDateToISO, showToastError } from '../lib/helpers';

const useCategoryDonations = (
	version: BackendVersion,
	fromDate: Date,
	toDate: Date,
	selectedNetworkId?: number,
	onlyVerified?: boolean,
	onlyEndaoment?: boolean,
) => {
	const [categoryDonations, setCategoryDonations] =
		useState<ITotalDonationsPerCategory[]>();
	const [loading, setLoading] = useState<boolean>(true);

	useEffect(() => {
		!loading && setLoading(true);
		const variables = {
			fromDate: formatDateToISO(fromDate),
			toDate: formatDateToISO(toDate),
			networkId: selectedNetworkId,
			onlyVerified,
			onlyEndaoment,
		};
		statsGQLRequest(version, fetchTotalDonationsPerCategory, variables)
			.then((res: IFetchTotalDonationsPerCategory) => {
				const total = res.data.totalDonationsPerCategory;
				setCategoryDonations(total);
			})
			.catch(showToastError)
			.finally(() => setLoading(false));
	}, [
		fromDate,
		toDate,
		selectedNetworkId,
		onlyVerified,
		onlyEndaoment,
		version,
	]);

	return { categoryDonations, loading };
};

export default useCategoryDonations;
