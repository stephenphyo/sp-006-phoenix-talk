import { useState, useEffect } from 'react';
import axios from 'axios';

const useAxios = () => {

    const [response, setReponse] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:9010';
    const API = axios.create({
        baseURL: API_URL
    });

    const fetch = (url, options = {}) => {

        const { method = 'GET', headers = null, body = null } = options;

        setIsLoading(true);
        API.request({
            url: url,
            method: method,
            headers: headers,
            data: body,
            ...options
        })
            .then(res => {
                setReponse(res);
            })
            .catch(err => {
                setError(err.response);
            })
            .finally(() => {
                setIsLoading(false);
            })
    }

    return { fetch, response, error, isLoading };
};

export default useAxios;