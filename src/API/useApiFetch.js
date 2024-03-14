// useApiFetch Hook Documentation

/**
 * The `useApiFetch` hook is a custom React hook designed to simplify and manage API requests
 * within a React component. It provides state variables to track the loading status, errors,
 * and the fetched data from the API. This hook uses the Axios library for making HTTP requests.
 */

// Usage:
// To use the `useApiFetch` hook, import it and call it within a functional component.
// It takes two optional parameters:
// - `requestConfigParam`: An object containing the initial configuration for the API request.
// - `initialFetch`: A boolean flag that indicates whether the API request should be triggered
// immediately when the component mounts.

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
  const [data, setData] = useState(null);
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
          message: 'NOT FOUND',
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
          message: 'Bad Request',
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    intialFetch && fetchData(requestConfig);
  }, [requestConfig, fetchData, intialFetch]);

  return { isLoading, errors, data, fetchData, setErrors };
};

export default useApiFetch;

// State Variables:
// - `isLoading`: A boolean variable indicating whether the API request is currently in progress.
// - `errors`: An object containing information about any errors that occurred during the API request.
// - `data`: The data received from the API response.

// Functions:
// - `fetchData(request)`: Initiates an API request using the Axios library with the specified request configuration.
// - `setErrors(errors)`: Manually sets the error state.

// Dependencies:
// - This hook depends on the Axios library for making HTTP requests. Make sure to install Axios in your project.
// - npm install axios

// Important Notes:
// - Customize the error handling logic for specific API responses.
// - Ensure that the `axios` library is correctly configured and available in your project.
// - The `fetchData` function is memoized using `useCallback` to avoid unnecessary re-renders.
// - Handle security concerns, such as proper validation and sanitization of data.
// - License: This hook is provided under the MIT License. Adjust it according to your project's needs.
