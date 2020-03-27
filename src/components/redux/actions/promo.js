import axios from 'axios';
import {API_KEY} from 'react-native-dotenv';

export const getPromo = () => {
  console.log('ini di action redux');
  return {
    type: 'GET_PROMO',
    payload: axios({
      method: 'GET',
      url: `${API_KEY}/promo`,
    }),
  };
};
export const getPromoLebaran = () => {
  return {
    type: 'GET_PROLEBARAN',
    payload: axios({
      method: 'GET',
      url: `${API_KEY}/promo/searchName=lebaran`,
    }),
  };
};
