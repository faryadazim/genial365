import { ShowNavTrue, ShowNavFalse } from "../constants/actionTypes.js";

export const setNavSm = () => async (dispatch) => {
  try {
    dispatch({ type: ShowNavFalse });
  } catch (error) {
    console.log(error.message);
  }
};

export const setNavMd = () => async (dispatch) => {
  try {
    dispatch({ type: ShowNavTrue });
  } catch (error) {
    console.log(error.message);
  }
};
