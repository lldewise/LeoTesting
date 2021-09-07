import axios from 'axios';
import { Base_URL, Endpoints } from '../environment';
import logger from 'loglevel';
import React from 'react';
import { getMSALAccessTokenForDownstreamApi } from "../util/msgraph/authHandler";
import { v4 as uuidv4 } from "uuid";

const { useState } = React;

const api = axios.create({
    baseURL: Endpoints.subscriptionAPI,
    headers: {
    }
});

api.interceptors.request.use(request => {
    return request;
}, error => {
    return Promise.reject(error);
});

api.interceptors.response.use(response => {
    return response;
}, error => {
    return Promise.reject(error);
});

export const useAxiosLoaderApiSubscription = () => {
    const [counter, setCounter] = useState(0);
    const [errorMessage, setErrorMessage] = useState("");

    api.interceptors.request.use(async function (config) {
        if (config.baseURL === Base_URL.newsPost) {
            const access_token = await getMSALAccessTokenForDownstreamApi();
            if (!config.headers.Authorization) {
                config.headers.Authorization = `Bearer ${access_token}`;
            }
            if (!config.headers) {
                config.headers["X-Correlation-Id"] = uuidv4();
            }
        }
        return config;
    });

    api.interceptors.response.use(response => {
        setCounter(0);
        return response;
    }, error => {
        setErrorMessage(error.message);
        let r = Math.random().toString(10).substring(7);
        setCounter(r);
        return Promise.reject(error);
    });
    return [counter, errorMessage];
}


export default api;
