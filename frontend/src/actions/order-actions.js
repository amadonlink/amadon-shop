import {orderTypes} from './../constants/order-types';
import { cartTypes } from './../constants/cartType';
import Axios from 'axios';


export const createOrder = (order) => async (dispatch, getState) => {
    dispatch({
        type: orderTypes.ORDER_CREATE_REQUEST,
        payload: order,
    });
    try {
        const {userSignin: {userInfo}, } = getState();
        const { data } = await Axios.post('/api/orders', order, {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        });
        dispatch({
            type: orderTypes.ORDER_CREATE_SUCCESS,
            payload: data.order,
        });
        dispatch({
            type: cartTypes.CART_EMPTY,
        });
        localStorage.removeItem('cartItems');
    } catch (error) {
        dispatch({
            type: orderTypes.ORDER_CREATE_FAIL,
            payload: 
                error.response && error.response.data.message ?
                error.response.data.message : error.message
        });
    }
};

export const detailsOrder = (orderId) => async (dispatch, getState) => {
    dispatch({
        type: orderTypes.ORDER_DETAILS_REQUEST,
        payload: orderId
    });
    const { userSignin: {userInfo},} = getState();
    try {
        const { data } = await Axios.get(`/api/orders/${orderId}`, {
            headers: {Authorization: `Bearer ${userInfo.token}`}
        });
        dispatch({
            type: orderTypes.ORDER_DETAILS_SECCESS,
            payload: data
        })
    } catch (error) {
            const message = 
                error.response && error.response.data.message
                ? error.response.data.message
                : error.message

                dispatch({
                    type:orderTypes.ORDER_DETAILS_FAIL,
                    payload: message,
                });
    }
}

export const payOrder = (order, paymentResult) => async (dispatch, getState) => {
    dispatch({
        type: orderTypes.ORDER_PAY_REQUEST,
        payload: { order, paymentResult },
    });
    const {userSignin: { userInfo },} = getState();
    try {
        const { data } = await Axios.put(`/api/orders${order._id}/pay`, paymentResult,{
            headers: { Authorization: `Bearer ${userInfo.token}`},
        });
        dispatch({
            type: orderTypes.ORDER_PAY_SUCCESS,
            payload: data
        })
    } catch (error) {
        const message = 
        error.response && error.response.data.message
        ? error.response.data.message
        : error.message

        dispatch({
            type:orderTypes.ORDER_PAY_FAIL,
            payload: message,
        });
    }
};

export const orderListMine = () => async (dispatch, getState) => {
    dispatch({
        type: orderTypes.ORDER_MINE_LIST_REQUEST,
    });
    const { userSignin: {userInfo},} = getState();
    try {
        const { data } = await Axios.get('/api/orders/mine', {
            headers: { 
                Authorization: `Bearer ${userInfo.token}`,
            },
        });
        dispatch({
            type: orderTypes.ORDER_MINE_LIST_SUCCESS,
            payload: data
        });

    } catch (error) {
        const message = 
        error.response && error.response.data.message
        ? error.response.data.message
        : error.message;

        dispatch({
            type: orderTypes.ORDER_MINE_LIST_FAIL,
            payload: message
        });
    }
}