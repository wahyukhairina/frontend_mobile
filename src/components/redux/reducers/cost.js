import axios from 'axios';
import {API_KEY} from 'react-native-dotenv';

export const postCost = (data) => {
  data.origin = '1151'
  data.courier = 'jne'
  return {
    type: 'POST_COST',
    payload: axios({
      method: 'POST',
      url: `${API_KEY}/courier/cost/`,
      data: data
    }),
  };
};