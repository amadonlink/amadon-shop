import { cartTypes } from "../../constants/cartType";


 const INITIAL_STATE = {
    cartItems: [],
};

export const cartReducer = (state = INITIAL_STATE.cartItems, action) => {
    switch(action.type){
        case cartTypes.CART_ADD_ITEM:
     // New product from payload
     const item = action.payload;
     const existItem = state.cartItems.find((x) => x.product === item.product);
     if(existItem){
         return{
             ...state,
             error: '',
             cartItems: state.cartItems.map((x) => x.product === existItem.product ? item : x),
         };
     }else{
        return{
            // return previous state
            ...state,
            error: '',
            // update the previous state in cartItems with new state ( item )
            cartItems: [...state.cartItems, item]
        };
    }
        case cartTypes.REMOVE_CART_ITEM:
            return{
                ...state,
                error: '',
                cartItems: state.cartItems.filter((x) => x.product !== action.payload),
            };
        case cartTypes.CART_SAVE_SHIPPING_ADDRESS:
            return{
                ...state,
                shippingAddress: action.payload
            };
        case cartTypes.CART_SVAE_PAYMENT_METHOD:
            return{
                ...state,
                paymentMethod: action.payload
            };
        case cartTypes.CART_ADD_ITEM_FAIL:
            return{
                ...state,
                error: action.payload
            };
        case cartTypes.CART_EMPTY:
            return{
                ...state,
                cartItems: [],
            };
        default:
            return state;
    }
};
