import { FETCH_ALL_USER, CREATE, UPDATE, DELETE, LIKE } from '../../constants/actionTypes';
import * as api from './api.js';



export const getUsers = (setisLoading) => async (dispatch) => {
  try {
    const data = await api.fetchUser(); 
    setisLoading(true)
    dispatch({ type: FETCH_ALL_USER, payload: data });

  } catch (error) {
    console.log(error.message , "Error here");
  }
};