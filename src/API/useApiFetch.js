import { useEffect, useState, useCallback } from 'react';
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
    const [requestConfig] = useState(requestConfigParam);

    const fetchData = useCallback(async (request) => {
        setIsLoading(true);
        setErrors({});

        try {
            const response = await axios.request({
                ...requestConfig,
                ...request,
            });
            setData(response.data || []);
            // return true;
        } catch (error) {
            if (error?.response?.status === 400) {
                setErrors({ message: 'Bad request', details: error });
            } else if (error?.response?.status === 401) {
                setErrors({ message: 'Unauthorized', details: error });
            } else if (error?.response?.status === 404) {
                setErrors({
                    message: 'Backend URL not found on server',
                    details: error,
                });
            } else if (error?.response?.status === 422) {
                setErrors({
                    message: 'Invalid Data, check your inputs',
                    details: error,
                });
            } else if (error?.response?.status === 415) {
                setErrors({
                    message: 'Invalid MIME type, check your inputs',
                    details: error,
                });
            } else if (
                error?.response?.status &&
                400 <= error?.response?.status &&
                error?.response?.status <= 499
            ) {
                setErrors({
                    message: 'Bad Request here',
                    details: error,
                });
            } else if (
                error?.response?.status &&
                500 <= error?.response?.status &&
                error?.response?.status <= 599
            ) {
                setErrors({ message: 'Server Error', details: error });
            } else if (error?.response?.data?.message) {
                setErrors({
                    message: error?.response?.message,
                    details: error,
                });
            } else if (error?.message) {
                setErrors({ message: error?.message, details: error });
            } else {
                setErrors({
                    message: 'Unknown Error',
                });
            }

            // return false;
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        intialFetch && fetchData(requestConfig);
    }, [requestConfig, fetchData, intialFetch]);

    return { isLoading, errors, data, fetchData, setErrors };
};

export default useApiFetch;
