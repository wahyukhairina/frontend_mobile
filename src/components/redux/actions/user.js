import axios from 'axios';
import {API_KEY} from 'react-native-dotenv';

export const addUser = (data) => {
  console.log('ini di action redux');
  return {
    type: 'POST_USER',
    payload: axios({
      method: 'POST',
      url: `${API_KEY}/user/register`,
      data:data,
    }),
  };
};
export const editUser = (userId,data) => {
  console.log(userId, data);
  return {
    type: 'EDIT_USER',
    payload: axios({
      method: 'PATCH',
      url: `${API_KEY}/user/${userId}`,
      data:data,
    }),
  };
};

export const getUser = (id) => {
  console.log('ini di action redux');
  return {
    type: 'GET_USER',
    payload: axios({
      method: 'GET',
      url: `${API_KEY}/user?id=${id}`,
    }),
  };
};