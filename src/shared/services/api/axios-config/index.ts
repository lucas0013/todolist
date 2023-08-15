import axios from 'axios';

import { errorInterceptor, responseInterceptor } from './interceptors';
import { Environment } from '../../../environment';

const Api = axios.create({
  baseURL: Environment.URL_BASE,
  headers: {
    Authorization: `Bearer ${JSON.parse(localStorage.getItem('APP_ACCESS_TOKEN')?.toString() || '{}')}`,
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With',
  }
});

Api.interceptors.response.use(
  (response) => responseInterceptor(response), 
  (error) => errorInterceptor(error),
);

export { Api };