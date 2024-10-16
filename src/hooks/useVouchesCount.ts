import { useEffect, useState } from 'react';
import { formatDateToISO, showToastError } from '../lib/helpers';
import { deVouchGQLRequest } from '../lib/requests';
import { FETCH_VOUCHES_COUNT_BY_DATE } from '../gql/gqlVerification';
import { IFetchVouchesCountRes } from '../types/gql';

export const useVouchesCount = (
	fromDate: Date,
	toDate: Date,
	organizationId: string,
) => {
	const [vouchCountInfo, setVouchCountInfo] = useState({});
	const [loading, setLoading] = useState<boolean>(true);
	useEffect(() => {
		!loading && setLoading(true);
		const variables = {
			fromDate: formatDateToISO(fromDate),
			toDate: formatDateToISO(toDate),
			organizationId,
		};
		deVouchGQLRequest(FETCH_VOUCHES_COUNT_BY_DATE, variables)
			.then((res: IFetchVouchesCountRes) => {
				setVouchCountInfo(res.data.getOrganisationVouchCountByDate);
			})
			.catch(showToastError)
			.finally(() => setLoading(false));
	}, []);

	return { vouchCountInfo, loading };
};
