import {productTypes} from '../constants/productTypes';
import Axios from 'axios';

export const listProducts = () => async (dispatch) => {
   dispatch({
       type: productTypes.PRODUCT_LIST_REQUEST
   });
   try {
    const { data } = await Axios.get('/api/products');
    dispatch({
        type: productTypes.PRODUCT_LIST_SUCCESS,
        payload: data
    });
   } catch (error) {
       dispatch({
           type: productTypes.PRODUCT_LIST_FAIL,
           payload: error.message
       });
   }
}

export const detailsProduct = (productId) => async (dispatch) => {
    dispatch({
        type: productTypes.PRODUCT_DETAIL_REQUEST,
        payload: productId
    });
    try {
        const {data} = await Axios.get(`/api/products/${productId}`);
        dispatch({
            type: productTypes.PRODUCT_DETAIL_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: productTypes.PRODUCT_DETAIL_FAIL,
            payload: error.response && error.response.data.message ? 
            error.response.data.message : error.message,
        });
    }
};
