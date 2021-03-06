import * as actionTypes from './actionTypes';

const INITIAL_STATE = {
  loading: false,
  account: '',
  priceRoute: {},
  tokens: [],
  tokenList: [],
  token1Loading: false,
};


export default (state = INITIAL_STATE, action) => { // eslint-disable-line
  switch (action.type) {
    case actionTypes.GET_PRICE_ROUTE_LOADING:
      return {
        ...state,
        token1Loading: true,
      };
    case actionTypes.GET_PRICE_ROUTE_SUCCESS:
      return {
        ...state,
        priceRoute: action.payload && action.payload.data && action.payload.data.priceRoute,
        token1Loading: false,
      };
    case actionTypes.GET_PRICE_ROUTE_ERROR:
      return {
        ...state,
        token1Loading: false,
      };
    case actionTypes.GET_TOKEN_LIST_SUCCESS:
      return {
        ...state,
        tokens: action.payload && action.payload.data && action.payload.data.tokens,
      };
    case actionTypes.SET_TOKEN_LIST:
      return {
        ...state,
        tokenList: action.payload,
      };
    case actionTypes.SET_ACCOUNT_ADDRESS:
      return {
        ...state,
        account: action.payload,
      };
    default:
      return state;
  }
};
