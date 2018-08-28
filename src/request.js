import axios from 'axios';
import FormData from 'form-data';
import { keys } from 'lodash';

const localStorage = window.localStorage;

const BASE_URL = 'http://178.128.82.252:17519/api/v2';

const genericRequestInstance = axios.create({
  baseURL: BASE_URL,
  crossdomain: true
});


export const genericRequest = (url, method, data) => 
  genericRequestInstance({ url, method, data })
  

export const authenticatedRequest = (url, method, data) => {
  const authenticatedRequestInstance = axios.create({
    baseURL: BASE_URL,
    crossdomain: true,
    headers: {
      'Authorization': `JWT ${localStorage.getItem('auth-token')}`,
    }
  });
  return authenticatedRequestInstance({ url, method, data })
}

export const authenticatedPostImageRequest = (url, method, data) => {
  const form = new FormData();
  // console.log(form.getHeaders);
  const key_data = keys(data);
  key_data.forEach(key => {
    form.set(key, data[key])
  })
  console.log(form);
  const authenticatedRequestInstance = axios.create({
    baseURL: BASE_URL,
    crossdomain: true,
    headers: {
      'Authorization': `JWT ${localStorage.getItem('auth-token')}`,
      'Content-Type': 'multipart/form-data'
    }
  });
  return authenticatedRequestInstance({ url, method, data: form })
}
