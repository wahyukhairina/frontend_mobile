import axios from 'axios';
import {API_KEY} from 'react-native-dotenv';

export const getProduct = () => {
  console.log('ini di actionredux', API_KEY);
  return {
    type: 'GET_PRODUCT',
    payload: axios({
      method: 'GET',
      url: `${API_KEY}/product`,
    }),
  };
};
export const getPage = (page) => {
  //   console.log('ini di action redux');
    return {
      type: 'GET_PRODUCT',
      payload: axios({
        method: 'GET',
        url: `${API_KEY}/product?limit=6&page=${page}`,
      }),
    };
  };
  
export const getNew = () => {
  return {
    type: 'GET_NEW',
    payload: axios({
      method: 'GET',
      url: `${API_KEY}/product/new`,
    }),
  };
};

export const getFilter = (id) => {
  return {
    type: 'FILTER_PRODUCT',
    payload: axios({
      method: 'GET',
      url: `${API_KEY}/product?category=${id}`,
    }),
  };
};

export const searchProduct = name => {
  return {
    type: 'GET_PRODUCT',
    payload: axios({
      method: 'GET',
      url: `${API_KEY}/product?name=${name}`,
    }),
  };
};

export const sortProduct = type => {
  console.log('ini action', type)
  return {
    type: 'SORT_PRODUCT',
    payload: axios({
      method: 'GET',
      url: `${API_KEY}/product?sortBy=price&type=${type}`,
    }),
  };
};
