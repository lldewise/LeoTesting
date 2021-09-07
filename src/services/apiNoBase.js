import axios from 'axios';
import logger from 'loglevel';
import React from 'react';
import { useAuthentication } from '../util/context/authentication';

const { useState } = React;
const apiNoBase = axios.create({
  baseURL: '',
  headers: {
    'Content-Type': 'application/json',
  },
});

apiNoBase.interceptors.request.use(
  request => {
    logger.log('My Request ' + request);
    // Edit request config
    return request;
  },
  error => {
    logger.log('My Request Error ' + error);

    return Promise.reject(error);
  },
);

apiNoBase.interceptors.response.use(
  response => {
    logger.log('My Response ' + response);
    // Edit request config
    return response;
  },
  error => {
    logger.log('My Response Error ' + error);
    return Promise.reject(error);
  },
);

export const useAxiosLoaderApiNoBase = () => {
  const { principal } = useAuthentication();
  const [counter, setCounter] = useState(0);
  const [errorMessage, setErrorMessage] = useState('');

  //apiNoBase.defaults.headers.common['Authorization'] = `Bearer ${principal?.accessToken}`;
  apiNoBase.interceptors.request.use(config => {
    config.headers.Authorization = `Bearer ${principal?.accessToken}`;
    //console.log(config.method + " " + config.headers.Authorization);
    return config;
  });

  apiNoBase.interceptors.response.use(
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

export default apiNoBase;
