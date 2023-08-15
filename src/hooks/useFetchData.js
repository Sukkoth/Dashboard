import { useState, useEffect, useCallback } from 'react';
import axios from '../API/axios';

const useFetchData = (url, term, type, contractId) => {
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState('');
    const [error, setError] = useState('');

    const fetchData = useCallback(async () => {
        const data = { term, type, ids: [Number(contractId)] };
        console.log('DATA', data);
        try {
            setError('');
            setData('');
            setIsLoading(true);
            console.log('Loading');
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
            console.log('Ended');
        }
    }, [term, type, contractId, url]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return { isLoading, data, error, fetchData };
};

export default useFetchData;
