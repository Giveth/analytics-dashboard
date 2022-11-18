import { useEffect, useState } from 'react';
import { backendGQLRequest } from '../lib/requests';
import { fetchProjectsCount } from '../gql/gqlProjects';
import { IFetchProjectsCount } from '../types/gql';
import { formatDateToISO } from '../lib/helpers';

const useFetchProjectsCount = (fromDate: Date, toDate: Date) => {
	const [projectsCount, setProjectsCount] = useState<number>();
	const [loading, setLoading] = useState<boolean>(true);

	useEffect(() => {
		!loading && setLoading(true);
		const variables = {
			fromDate: formatDateToISO(fromDate),
			toDate: formatDateToISO(toDate),
		};
		backendGQLRequest(fetchProjectsCount, variables)
			.then((res: IFetchProjectsCount) => {
				setProjectsCount(res.data.projectsPerDate);
			})
			.finally(() => setLoading(false));
	}, [fromDate, toDate]);

	return { projectsCount, loading };
};

export default useFetchProjectsCount;
