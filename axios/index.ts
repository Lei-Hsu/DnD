import axios from 'axios';

// TODO:到時候捕 type
const customAxios: any = axios.create({
  baseURL: 'http://localhost:3000/',
  headers: {
    'Content-type': 'application/json',
  }
});

export interface Response<T> {
  data: {
    data: T
    status: 'success' | 'fail',
    message?: string
  }
}

export const addAxiosHeader = (token: string) => {
  if (customAxios.defaults.headers) {
    customAxios.defaults.headers.common.Authorization = `Bearer ${token}`
  }
}

export const clearAxiosHeader = () => {
  if (customAxios.defaults.headers) {
    customAxios.defaults.headers.common.Authorization = ``
  }
}

export default customAxios