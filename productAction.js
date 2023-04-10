const redux = require("redux");
const thunkMiddleware = require("redux-thunk").default;
const axios = require("axios");

const createStore = redux.createStore;
const applyMiddleware = redux.applyMiddleware;

const initialState = {
  loading: false,
  products: [],
  error: "",
};

const FETCH_PRODUCT_REQUESTED = "FETCH_PRODUCT_REQUESTED";
const FETCH_PRODUCT_SUCCEEDED = "FETCH_PRODUCT_SUCCEEDED";
const FETCH_PRODUCT_FAILED = "FETCH_PRODUCT_FAILED";

const fetchProducts = () => {
  return {
    type: FETCH_PRODUCT_REQUESTED,
  };
};

const fetchProductsSucceed = (products) => {
  return {
    type: FETCH_PRODUCT_SUCCEEDED,
    payload: products,
  };
};

const fetchProductsFailed = (error) => {
  return {
    type: FETCH_PRODUCT_FAILED,
    payload: error,
  };
};

const productsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PRODUCT_REQUESTED:
      return {
        ...state,
        loading: true,
      };
    case FETCH_PRODUCT_SUCCEEDED:
      return {
        ...state,
        products: action.payload,
      };
    case FETCH_PRODUCT_FAILED:
      return {
        ...state,
        loading: false,
        products: [],
        error: action.payload,
      };
  }
};

const getProducts = () => {
  return function (dispatch) {
    dispatch(fetchProducts());
    axios
      .get("https://fakestoreapi.com/products")
      .then((res) => {
        const products = res.data.map((product) => product.title);
        dispatch(fetchProductsSucceed(products));
      })
      .catch((error) => dispatch(fetchProductsFailed(error.message)));
  };
};

const store = createStore(productsReducer, applyMiddleware(thunkMiddleware))
store.subscribe(() => {
    console.log(store.getState())
})
store.dispatch(getProducts())