import { combineReducers } from 'redux';
import { cartReducer } from './reducers/cart/cart-reducers';
import { orderCreateReducer, orderDetailsReducer, orderMineListReducer, orderPayReducer } from './reducers/order/order-reducers';
import { productDetailsReducer, productListReducer} from './reducers/product/product-reducer';
import { userDetailsReducer, userRegisterReducer, userSigninReducer } from './reducers/user/user-reducers';



export const rootReducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
    cart: cartReducer,
    userSignin: userSigninReducer,
    userRegister: userRegisterReducer,
    orderCreate: orderCreateReducer,
    orderDetails: orderDetailsReducer,
    orderPay: orderPayReducer,
    orderMineList: orderMineListReducer,
    userDetails: userDetailsReducer,
});