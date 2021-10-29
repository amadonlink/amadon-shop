import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Rating from '../../components/Rating';
import { Link } from 'react-router-dom';
import LoadingBox from '../../components/LoadingBox';
import MessageBox from '../../components/MessageBox';
import { detailsProduct } from '../../actions/product-actions';


// const mapState = (state) => ({
//     productDetails: state.productDetails
// });

const ProductDetail = (props) => {
    const dispatch = useDispatch();
    // const {products, loading, error} = useSelector(mapState);
    const productId = props.match.params.id;
    const [qty, setQty] = useState(1);
    const productDetails = useSelector(state => state.productDetails);
    const {products, loading, error} = productDetails;

 


    useEffect(() => {
        dispatch(
            detailsProduct(productId)
        )
    },[dispatch, productId]);

    const addToCartHandler = () => {
        props.history.push(`/cart/${productId}?qty=${qty}`);
    }

    return (
        <div>
                {
                    loading ? (
                        <LoadingBox></LoadingBox>
                    ) : error ? (
                        <MessageBox variant='danger'>{error}</MessageBox>
                    ) : (
                        <div>
                        <Link to="/">Back to shop</Link>
                         <div className='row top'>
                             <div className='col-2'>
                             <img className='large' src={products.image} alt={products.name}></img>
                             </div>
                             <div className='col-1'>
                                 <ul>
                                     <li>
                                         <h2>{products.name}</h2>
                                     </li>
                                     <li>
                                         <Rating rating={products.rating} numReviews={products.numReviews}></Rating>
                                     </li>
                                     <li>
                                         Price : ${products.price}
                                     </li>
                                     <li>
                                     <p>Description : {products.description}</p>
                                     </li>
                                 </ul>
                             </div>
                             <div className='col-1'>
                                 <div className='card card-body'>
                                     <ul>
                                         <li>
                                             <div className='row'>
                                             <div>Price</div>
                                             <div className='price'>${products.price}</div>
                                             </div>
                                         </li>
                                         <li>
                                             <div className='row'>
                                             <div>Status</div>
                                             <div>
                                             { products.countInStock > 0 ? (<span className='success'>In stock</span>
                                             ) : (<span className='danger'>Unavailable</span>
                                             )}
                                             </div>
                                             </div>
                                         </li>
                                         {
                                             products.countInStock > 0 && (
                                                 <>
                                                 <li>
                                                     <div className='row'>
                                                         <div>QTY</div>
                                                         <div>
                                                             <select value={qty} onChange={e => setQty(e.target.value)}>
                                                                 {
                                                                     [...Array(products.countInStock).keys()].map((x) => (
                                                                         <option key={x + 1} value={x + 1}>{x + 1}</option>
                                                                     ))
                                                                 }
                                                             </select>
                                                         </div>
                                                     </div>
                                                </li>
                                                <li>
                                                <button onClick={addToCartHandler} className='primary block'>Add To Cart</button>
                                                </li>
                                                </>
                                             )}
                                     </ul>
                                 </div>
                             </div>
                         </div>
                     </div> 
             )}
        </div>
    );
}

export default ProductDetail
