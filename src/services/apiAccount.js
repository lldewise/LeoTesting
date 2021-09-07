import axios from 'axios';
import { Endpoints } from '../environment';
import logger from 'loglevel';
import React from 'react';
import { useAuthentication } from '../util/context/authentication';
import { v4 as uuidv4 } from 'uuid';

const { useState } = React;

const api = axios.create({
  baseURL: Endpoints.accountAPI,
  headers: {},
});

api.interceptors.request.use(
  request => {
    logger.log('My Request ' + request);
    return request;
  },
  error => {
    logger.log('My Request Error1 ' + error);

    return Promise.reject(error);
  },
);

api.interceptors.response.use(
  response => {
    logger.log('My Response ' + response);

    // Edit request config
    return response;
  },
  error => {
    logger.log('My Response Error2 ' + error);

    return Promise.reject(error);
  },
);

export const useAxiosLoader = () => {
  const { principal } = useAuthentication();
  const [counter, setCounter] = useState(0);
  const [errorMessage, setErrorMessage] = useState('');

  api.interceptors.request.use(config => {
    if (config.baseURL === Endpoints.accountAPI) {
      if (!config.headers.Authorization) {
        config.headers.Authorization = `Bearer ${principal?.accessToken}`;
      }
      if (!config.headers) {
        config.headers['X-Correlation-Id'] = uuidv4();
      }
    }
    return config;
  });

  api.interceptors.response.use(
    response => {
      logger.log('My Response ' + response);
      setCounter(0);
      // Edit request config
      return response;
    },
    error => {
      setErrorMessage(error.message);
      const r = Math.random().toString(10).substring(7);
      logger.log('My Response Error' + error);
      setCounter(r);
      return Promise.reject(error);
    },
  );
  return [counter, errorMessage];
};

export default api;
