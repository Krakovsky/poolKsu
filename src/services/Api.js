import axios from 'axios';

import { API_URL } from '../constants';
import getAuthToken from '../utils/getAuthToken';

async function defaultHeaders(token) {
  return {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${await getAuthToken(token)}`,
  };
}

export default class Api {
  static onError(error) {
    throw error;
  }

  static async post(path, data, config = {}) {
    const headers = await defaultHeaders();

    return axios.post(`${API_URL}/${path}`, data, { headers, ...config }).catch(Api.onError);
  }

  static async uploadFile(path, data, config = {}) {
    const headers = await defaultHeaders();

    return axios
      .post(`${API_URL}/${path}`, data, {
        headers,
        ...config,
        // boundary="another cool boundary";
        'Content-Type': 'multipart/form-data',
      })
      .catch(Api.onError);
  }

  static async put(path, data, config = {}) {
    const headers = await defaultHeaders();

    return axios
      .put(`${API_URL}/${path}`, data, { headers, ...config })
      .catch(Api.onError);
  }

  static async patch(path, data, config = {}) {
    const headers = await defaultHeaders();

    return axios
      .patch(`${API_URL}/${path}`, data, { headers, ...config })
      .catch(Api.onError);
  }

  static async delete(path, id) {
    const headers = await defaultHeaders();
    const url = [path, id].join('/');

    return axios
      .delete(`${API_URL}/${url}`, { headers })
      .catch(Api.onError);
  }

  static async get(path, params = {}, config = {}) {
    const headers = await defaultHeaders();

    return axios
      .get(`${API_URL}/${path}`, { headers, params, ...config })
      .catch(Api.onError);
  }

  static async checkToken(data) {
    const queryString = new URLSearchParams(data).toString();

    return axios.post(`${API_URL}/connect/token`, queryString, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } });
  }

  static async authPost(path, data) {
    return axios.post(`${API_URL}/${path}`, data);
  }
}
