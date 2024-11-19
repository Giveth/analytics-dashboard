import { useEffect, useState } from 'react';
import { createPublicClient, http } from 'viem';
import { mainnet } from 'viem/chains';
import { getEnsName } from 'viem/actions';
import { formatDateToISO, showToastError } from '../lib/helpers';
import { deVouchGQLRequest } from '../lib/requests';
import {
	IAttestorVouchesCountToSource,
	IAttestorVouchesCountToSourceRes,
} from '../types/gql';
import { FETCH_USER_VOUCHES_COUNT_TO_SOURCE_BY_DATE } from '../gql/gqlVerification';

// Initialize the viem public client
const client = createPublicClient({
	chain: mainnet,
	transport: http(),
});

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
			.then(async (res: IAttestorVouchesCountToSourceRes) => {
				const vouchData =
					res.data.getOrganisationUserVouchCountBySource;

				if (vouchData?.vouchCountByUser) {
					// Resolve ENS names using viem's getEnsName
					const resolvedVouches = await Promise.all(
						vouchData.vouchCountByUser.map(async vouch => {
							try {
								const ensName = await getEnsName(client, {
									address: vouch.attestorId as `0x${string}`,
								});
								return {
									...vouch,
									attestorId: ensName || vouch.attestorId, // Use ENS name if available
								};
							} catch {
								return vouch; // Fallback to original address if ENS lookup fails
							}
						}),
					);

					setAttestorsVouchesCountInfo({
						...vouchData,
						vouchCountByUser: resolvedVouches,
					});
				}
			})
			.catch(showToastError)
			.finally(() => setLoading(false));
	}, [fromDate, toDate, organizationId, source]);

	return { attestorsVouchesCountInfo, loading };
};
