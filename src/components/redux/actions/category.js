import axios from 'axios';
import {API_KEY} from 'react-native-dotenv';

export const getCategory = () => {
  console.log('ini di action category');
  return {
    type: 'GET_CATEGORY',
    payload: axios({
      method: 'GET',
      url: `${API_KEY}/category`,
    }),
  };
};
