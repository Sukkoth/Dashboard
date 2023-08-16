import { useState, useEffect, useCallback } from 'react';
import axios from '../API/axios';

const useFetchData = (url, term, type, contractId) => {
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState('');
    const [error, setError] = useState('');

    const fetchData = useCallback(async () => {
        try {
            setError('');
            setData('');
            setIsLoading(true);
            const res = await axios.post(url, {
                type,
                term,
                ids: [contractId],
            });
            setData(res.data);
        } catch (error) {
            setError(error);
        } finally {
            setIsLoading(false);
        }
    }, [term, type, contractId, url]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return { isLoading, data, error, fetchData };
};

export default useFetchData;
