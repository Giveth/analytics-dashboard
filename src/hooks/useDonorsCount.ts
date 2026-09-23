import { useEffect, useState } from 'react';
import { BackendVersion, statsGQLRequest } from '../lib/requests';
import { IFetchDonorsCount, IResFormat } from '../types/gql';
import { formatDateToISO, showToastError } from '../lib/helpers';
import { fetchDonorsCount } from '../gql/gqlDonors';

const useDonorsCount = (
	version: BackendVersion,
	fromDate: Date,
	toDate: Date,
	selectedNetworkId?: number,
	onlyEndaoment?: boolean,
) => {
	const [donorsCount, setDonorsCount] = useState<IResFormat>();
	const [loading, setLoading] = useState<boolean>(true);

	useEffect(() => {
		!loading && setLoading(true);
		const variables = {
			fromDate: formatDateToISO(fromDate),
			toDate: formatDateToISO(toDate),
			networkId: selectedNetworkId,
			onlyEndaoment,
		};
		statsGQLRequest(version, fetchDonorsCount, variables)
			.then((res: IFetchDonorsCount) => {
				setDonorsCount(res.data.totalDonorsCountPerDate);
			})
			.catch(showToastError)
			.finally(() => setLoading(false));
	}, [fromDate, toDate, selectedNetworkId, onlyEndaoment, version]);

	return { donorsCount, loading };
};

export default useDonorsCount;
