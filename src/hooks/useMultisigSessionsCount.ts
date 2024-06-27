import { useEffect, useState } from 'react';
import config from '../configuration';

const useMultisigSessionsCount = (fromDate: Date, toDate: Date) => {
    const [multisigSessionsCount, setMultisigSessionsCount] = useState<number | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null);
            try {
                const url = new URL(`${config.SWIE_AUTH_MICROSERVICE_URL}/v1/multisigSessionCount`);
                url.searchParams.append('from', fromDate.toISOString().split('T')[0]);
                url.searchParams.append('to', toDate.toISOString().split('T')[0]);

                const response = await fetch(url.toString(), {
                    method: 'GET',
                });
                const data = await response.json();
                setMultisigSessionsCount(data.count);
            } catch (err) {
                setError('Failed to fetch data');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [fromDate, toDate]);

    return { multisigSessionsCount, loading, error };
};

export default useMultisigSessionsCount;
