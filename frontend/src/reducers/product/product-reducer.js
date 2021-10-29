import { productTypes } from "./../../constants/productTypes";

const initialState = {
  products: [],
  loading: true,
};

export const productListReducer = (state = initialState, action) => {
  switch (action.type) {
    case productTypes.PRODUCT_LIST_REQUEST:
      return {
        loading: true,
      };
    case productTypes.PRODUCT_LIST_SUCCESS:
      return {
        loading: false,
        products: action.payload,
      };
    case productTypes.PRODUCT_LIST_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const productDetailsReducer = (
  state = { product: {}, loading: true },
  action
) => {
  switch (action.type) {
    case productTypes.PRODUCT_DETAIL_REQUEST:
      return {
        loading: true,
      };
    case productTypes.PRODUCT_DETAIL_SUCCESS:
      return {
        loading: false,
        products: action.payload,
      };
    case productTypes.PRODUCT_DETAIL_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
