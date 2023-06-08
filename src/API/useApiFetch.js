import { useEffect, useState } from 'react';
import axios from './axios';

/**
 *
 * @param {*} requestOptions
 * @param {boolean} fetchAtStart
 * @returns
 */
const useApiFetch = (requestOptions = {}, fetchAtStart = true) => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrros] = useState({});

    const makeRequest = async (request) => {
        try {
            const response = await axios.request(request);
            setData(response.data);
            if (response.status === 200) {
                console.log('SUCCESS', response.data);
            } else if (response.status === 201) {
                console.log('CREATED', response.data);
            } else if (response.status === 204) {
                console.log('NO CONTENT SUCCESS');
            } else {
                console.log('ANOTHER STATUS', response.status);
            }
        } catch (error) {
            setErrros(error);
            switch (error?.response?.status) {
                case 422:
                    console.log('INVALID DATA', error?.response?.data);
                    break;
                case 401:
                    console.log('UNAUTHRIZED', error?.response?.data);
                    break;
                case 403:
                    console.log('REQUEST FORBIDDEN', error?.response?.data);
                    break;
                case 400:
                    console.log('BAD REQUEST', error?.response?.data);
                    break;
                case 500:
                    console.log('SERVER ERROR', error?.response?.data);
                    break;
                default:
                    console.log('NO RESPONSE FROM SERVER', error?.message);
                    break;
            }
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchAtStart && makeRequest(requestOptions);
    }, []);

    return { data, isLoading, errors, makeRequest };
};

export default useApiFetch;
