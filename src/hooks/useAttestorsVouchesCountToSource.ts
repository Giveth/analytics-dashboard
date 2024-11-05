import { useEffect, useState } from 'react';
import { formatDateToISO, showToastError } from '../lib/helpers';
import { deVouchGQLRequest } from '../lib/requests';
import {
	IAttestorVouchesCountToSource,
	IAttestorVouchesCountToSourceRes,
} from '../types/gql';
import { FETCH_USER_VOUCHES_COUNT_TO_SOURCE_BY_DATE } from '../gql/gqlVerification';

export const useAttestorsVouchesCountToSource = (
	fromDate: Date,
	toDate: Date,
	organizationId: string,
	source: string,
) => {
	const [attestorsVouchesCountInfo, setAttestorsVouchesCountInfo] =
		useState<IAttestorVouchesCountToSource>();
	const [loading, setLoading] = useState<boolean>(true);
	useEffect(() => {
		!loading && setLoading(true);
		const variables = {
			fromDate: formatDateToISO(fromDate),
			toDate: formatDateToISO(toDate),
			organisationId: organizationId,
			source,
		};
		deVouchGQLRequest(FETCH_USER_VOUCHES_COUNT_TO_SOURCE_BY_DATE, variables)
			.then((res: IAttestorVouchesCountToSourceRes) => {
				setAttestorsVouchesCountInfo(
					res.data.getOrganisationUserVouchCountBySource,
				);
			})
			.catch(showToastError)
			.finally(() => setLoading(false));
	}, [fromDate, toDate, organizationId, source]);

	return { attestorsVouchesCountInfo, loading };
};
