import axios from 'axios';
import FormData from 'form-data';

const localStorage = window.localStorage;

const genericRequestInstance = axios.create({
  baseURL: 'http://35.240.158.95:9001/api',
  crossdomain: true
});


export const genericRequest = (url, method, data) => 
  genericRequestInstance({ url, method, data })
  

export const authenticatedRequest = (url, method, data) => {
  const authenticatedRequestInstance = axios.create({
    baseURL: 'http://35.240.171.112/api',
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
  form.set('image', data);
  const authenticatedRequestInstance = axios.create({
    baseURL: 'http://35.240.171.112/api',
    crossdomain: true,
    headers: {
      'Authorization': `JWT ${localStorage.getItem('auth-token')}`,
      'Content-Type': 'multipart/form-data'
    }
  });
  return authenticatedRequestInstance({ url, method, data: form })
}
