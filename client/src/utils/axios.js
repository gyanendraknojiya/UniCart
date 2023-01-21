import axios from 'axios';
import ROUTES from 'config/routes.json';

// Need define API URL in constants or .env
const API_URL = process.env.REACT_APP_API_URL;

let axiosInstance = axios.create({
  baseURL: API_URL,
});

function configAxios() {
  axiosInstance = axios.create({
    baseURL: API_URL,
  });
}
//

const handleUnauthorizedError = (e) => {
  if (e.response?.status === 401) {
    window.location.href = ROUTES.LOGIN;
  }
};

function getHeaders() {
  const token = localStorage.getItem('token');
  return {
    accept: 'application/json',
    Authorization: token,
  };
}

export function post(url, data, thunkAPI, headers = true) {
  configAxios();
  return axiosInstance({
    method: 'POST',
    url,
    data,
    headers: headers ? getHeaders() : {},
  })
    .then((response) => response)
    .catch((error) => {
      handleUnauthorizedError(error);
      throw thunkAPI.rejectWithValue(error.response.data);
    });
}

// delete is a reserved name
export function del(url, data, thunkAPI) {
  configAxios();
  return axiosInstance({
    method: 'DELETE',
    url,
    data,
    headers: getHeaders(),
  })
    .then((response) => response)
    .catch((error) => {
      handleUnauthorizedError(error);
      throw thunkAPI.rejectWithValue(error.response.data);
    });
}

export function get(url, thunkAPI) {
  configAxios();
  return axiosInstance({
    method: 'GET',
    url,
    headers: getHeaders(),
  })
    .then((response) => response)
    .catch((error) => {
      handleUnauthorizedError(error);
      throw thunkAPI.rejectWithValue(error.response.data);
    });
}

export function patch(url, data, thunkAPI) {
  configAxios();
  return axiosInstance({
    method: 'PATCH',
    url,
    data,
    headers: getHeaders(),
  })
    .then((response) => response)
    .catch((error) => {
      handleUnauthorizedError(error);
      throw thunkAPI.rejectWithValue(error.response.data);
    });
}
