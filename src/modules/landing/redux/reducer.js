import * as actionTypes from './actionTypes';

const INITIAL_STATE = {
  loading: false,
  priceRoute: {},
  tokens: [],
  tokenList: [],
};


export default (state = INITIAL_STATE, action) => { // eslint-disable-line
  switch (action.type) {
    case actionTypes.GET_PRICE_ROUTE_SUCCESS:
      return {
        ...state,
        priceRoute: action.payload && action.payload.data && action.payload.data.priceRoute,
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
    default:
      return state;
  }
};
