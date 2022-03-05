import axios from 'axios';

export function request(config) {
  // axios实例
  const instance = axios.create({
    baseURL: '/api/',
    timeout: 2000
  })
  return instance(config);
}
