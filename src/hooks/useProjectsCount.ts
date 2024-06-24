import { useEffect, useState } from 'react';
import { backendGQLRequest } from '../lib/requests';
import { fetchProjectsCount } from '../gql/gqlProjects';
import { IFetchProjectsCount, IResFormat } from '../types/gql';
import { formatDateToISO, showToastError } from '../lib/helpers';

const useProjectsCount = (
	fromDate: Date,
	toDate: Date,
	selectedNetwork: string,
	onlyVerified?: boolean,
	onlyListed?: boolean,
) => {
	const [projectsCount, setProjectsCount] = useState<IResFormat>();
	const [loading, setLoading] = useState<boolean>(true);

	useEffect(() => {
		!loading && setLoading(true);
		const variables = {
			fromDate: formatDateToISO(fromDate),
			toDate: formatDateToISO(toDate),
			network: selectedNetwork,
			onlyVerified: onlyVerified || false,
			onlyListed: onlyListed || false,
		};
		backendGQLRequest(fetchProjectsCount, variables)
			.then((res: IFetchProjectsCount) => {
				setProjectsCount(res.data.projectsPerDate);
			})
			.catch(showToastError)
			.finally(() => setLoading(false));
	}, [fromDate, toDate, selectedNetwork, onlyListed, onlyVerified]);

	return { projectsCount, loading };
};

export default useProjectsCount;
