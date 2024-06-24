import { useEffect, useState } from 'react';
import { backendGQLRequest } from '../lib/requests';
import { IFetchDonorsCount, IResFormat } from '../types/gql';
import { formatDateToISO, showToastError } from '../lib/helpers';
import { fetchDonorsCount } from '../gql/gqlDonors';

const useDonorsCount = (
	fromDate: Date,
	toDate: Date,
	selectedNetwork: string, // Added selectedNetwork parameter
) => {
	const [donorsCount, setDonorsCount] = useState<IResFormat>();
	const [loading, setLoading] = useState<boolean>(true);

	useEffect(() => {
		!loading && setLoading(true);
		const variables = {
			fromDate: formatDateToISO(fromDate),
			toDate: formatDateToISO(toDate),
			network: selectedNetwork,
		};
		backendGQLRequest(fetchDonorsCount, variables)
			.then((res: IFetchDonorsCount) => {
				setDonorsCount(res.data.totalDonorsCountPerDate);
			})
			.catch(showToastError)
			.finally(() => setLoading(false));
	}, [fromDate, toDate, selectedNetwork]);

	return { donorsCount, loading };
};

export default useDonorsCount;
