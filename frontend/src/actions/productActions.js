import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL
} from '../constants/productsConstants';

import axios from '../axios';

export const listProducts = () => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_LIST_REQUEST });

    const res = await axios.get('/api/products');

    dispatch({ type: PRODUCT_LIST_SUCCESS, payload: res.data });
  } catch (err) {
    dispatch({
      type: PRODUCT_LIST_FAIL,
      payload: err?.response?.data?.message ?? err.message
    });
  }
};