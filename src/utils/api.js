import axios from 'axios';
import { BASE_URL } from '../config';
import { showNotification } from './Notifications';
import history from '../history';

function makeHeaders() {
  let headerObj = {};

  if (localStorage.getItem('access_token')) {
    const token = `Bearer ${localStorage.getItem('access_token')}`;
    headerObj = {
      Authorization: token,
    };
  }

  return headerObj;
}

const axiosApi = axios.create({
  // withCredentials: true,
  baseURL: `${BASE_URL}/`,
});

axiosApi.interceptors.request.use((request) => {
  // Only cache GET requests
  // if (request.method === 'get') {
  //   let { url } = request;
  //   if (url.indexOf('?') > 0) url += `&random=${Math.random()}`;
  //   else url += `?random=${Math.random()}`;
  //   request.url = url;
  // }
  if (!request.ignoreAuth) {
    request.headers = makeHeaders();
  }
  return request;
  // request.headers = makeHeaders();
  // return request;
});

axiosApi.interceptors.response.use(response => response, (err) => {
  if (err.response && err.response.status === 401) {
    localStorage.clear();
    showNotification('Your session has expired. Please log in again', 'error', 5000);
    history.push('/login');
    // if you don't return here, then an error will be thrown and you will see a loader infinitely
    return true;
  }
  if (err.response && err.response.status === 403) {
    showNotification(err.response.data.msg, 'error', 5000);
  }
  if (err.response && err.response.status === 500) {
    showNotification('Unknown server error', 'error', 5000);
  }
  return Promise.reject(err);
});

export default axiosApi;
