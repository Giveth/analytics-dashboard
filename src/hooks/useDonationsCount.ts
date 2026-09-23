import { useEffect, useState } from 'react';
import { BackendVersion, statsGQLRequest } from '../lib/requests';
import { IFetchDonationsCount, IResFormat } from '../types/gql';
import { formatDateToISO, showToastError } from '../lib/helpers';
import { fetchDonationsCount } from '../gql/gqlDonations';

const useDonationsCount = (
	version: BackendVersion,
	fromDate: Date,
	toDate: Date,
	selectedNetworkId?: number,
	onlyVerified?: boolean,
	onlyEndaoment?: boolean,
) => {
	const [donationsCount, setDonationsCount] = useState<IResFormat>();
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
		statsGQLRequest(version, fetchDonationsCount, variables)
			.then((res: IFetchDonationsCount) => {
				setDonationsCount(res.data.totalDonationsNumberPerDate);
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

	return { donationsCount, loading };
};

export default useDonationsCount;
