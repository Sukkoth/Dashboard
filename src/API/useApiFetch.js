import { useEffect, useState } from 'react';
import axios from './axios';
const useApiFetch = (
    requestConfigParam = {
        url: '',
        method: '',
        data: {},
        params: {},
        headers: {},
        auth: {},
    },
    intialFetch = true
) => {
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const [data, setData] = useState([]);
    const [requestConfig, setRequestConfig] = useState(requestConfigParam);

    const fetchData = async (request = {}) => {
        setIsLoading(true);
        setErrors({});
        try {
            console.log('MAKING REQUEST', {
                ...requestConfig,
                ...request,
            });
            const response = await axios.request({
                ...requestConfig,
                ...request,
            });
            setData(response.data || []);
            return true;
        } catch (error) {
            if (error?.response?.status === 400) {
                setErrors({ message: 'Bad request' });
            } else if (error?.response?.status === 401) {
                setErrors({ message: 'Unauthorized' });
            } else if (error?.response?.status === 404) {
                setErrors({ message: 'Backend URL not found on server' });
            } else if (error?.response?.status === 422) {
                setErrors({ message: 'Invalid Data, check your inputs' });
            } else if (error?.response?.status === 500) {
                setErrors({ message: 'Internal Server Error' });
            } else if (error?.message) {
                setErrors({ message: error?.message });
            } else {
                console.log('ANOTHER ERROR OCCURED', error);
            }
            return false;
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        intialFetch && fetchData(requestConfig);
    }, [requestConfig]);

    return { isLoading, errors, data, fetchData, setErrors };
};

export default useApiFetch;
