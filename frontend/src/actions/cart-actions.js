import Axios from "axios";
import { cartTypes } from "../constants/cartType";


export const addToCart = (productId, qty) => async (dispatch, getState) => {
    const { data } = await Axios.get(`/api/products/${productId}`);
    dispatch({
        type: cartTypes.CART_ADD_ITEM,
        payload: {
            name: data.name,
            image: data.image,
            price: data.price,
            countInstock: data.countInstock,
            product: data._id,
            qty,
        },
    });

    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems)); 
}; 

export const removeFromCart = (productId) => (dispatch, getState) => {
    dispatch({
        type: cartTypes.REMOVE_CART_ITEM, 
        payload: productId,
    });
    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
};

export const saveShippingAddress = (data) => (dispatch) => {
   dispatch({
        type: cartTypes.CART_SAVE_SHIPPING_ADDRESS,
        payload: data
   });
   localStorage.setItem('shippingAddress', JSON.stringify(data));
}

export const savePaymentMethod = (data) => (dispatch) => {
    dispatch({
        type: cartTypes.CART_SVAE_PAYMENT_METHOD,
        payload: data
    });
};
