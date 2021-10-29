import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router , Route, Switch, Link } from 'react-router-dom';
import Home from '../pages/Home';
import ProductDetail from '../pages/productDetails';
import Checkout from '../pages/checkout';
import SigninScreen from '../pages/signin';
import { signout } from '../actions/user-actions';
import RegisterScreen from '../pages/register';
import CartScreen from '../pages/cart';
import ShippingAddressScreen from '../pages/checkout/ShippingAddressScreen';
import PaymentMethodScreen from '../pages/payment';
import PlaceOrderScreen from '../pages/place-order';
import OrderScreen from '../pages/order-detail';
import OrderHistoryScreen from '../pages/orderHistory';
import { orderListMine } from '../actions/order-actions';
import ProfileScreen from '../pages/user-profile';


export default function AppRouter() {
    const dispatch = useDispatch();

    const cart = useSelector(state => state.cart);
    const { cartItems } = cart;

    const userSignin = useSelector((state) => state.userSignin);
    const {userInfo} = userSignin;

    const signoutHandler = () => {
        dispatch(
            signout()
        );
    };

    useEffect(() => {
        dispatch(
            orderListMine()
        );
    }, [dispatch]);


    return (
        <Router>
        <Switch>
        <div className="grid-container">
        <header className="row">
            <div>
                <Link className="brand" to="/">Ecom - Store</Link>
            </div>
            <div>
                <Link to="/cart">
                {
                    cartItems.length > 0 && (
                        <span className='badge'>{cartItems.length}</span>
                    )
                }
                </Link>
                {
                    userInfo ? (
                    <div className="dropdown">
                        <Link to='#'>{userInfo.name} <i className='fa fa-caret-down'></i>{' '}
                        </Link>
                        <ul className='dropdown-content'>
                            <li>
                                <Link to='/profile'>User Profile</Link>
                            </li>
                           <li>
                             <Link to="/orderhistory">Order History</Link>
                            </li>
                            <li>
                            <Link t0='#signout' onClick={signoutHandler}>Sign Out</Link>
                            </li>
                        </ul>
                    </div>
                    ) : (
                        <Link to="/signin">Sign in</Link>
                    )
                }
            </div>
        </header>
        <main>
        {/* <AppRouter /> */}
                <Route exact path='/' component={Home}/>
                <Route exact path='/product/:id' component={ProductDetail}/>
                <Route exact path='/cart/:id?' component={CartScreen}/>
                <Route exact path='/checkout' component={Checkout}/>
                <Route exact path='/signin' component={SigninScreen}/>
                <Route exact path='/register' component={RegisterScreen}/>
                <Route exact path='/shipping' component={ShippingAddressScreen}/>
                <Route exact path='/payment' component={PaymentMethodScreen}/>
                <Route exact path='/placeorder' component={PlaceOrderScreen}/>
                <Route exact path='/order/:id' component={OrderScreen} />
                <Route exact path='/orderhistory' component={OrderHistoryScreen} />
                <Route exact path='/profile' component={ProfileScreen} />
        </main>
        <footer className="row center">
            All right reserved.
        </footer>
    </div>
    </Switch>
    </Router>
    )
}
