import * as actionTypes from './actionTypes';
import api from '../../../utils/api';


export const getPriceRoute = (data) => ({
  type: actionTypes.GET_PRICE_ROUTE,
  payload: api.get(`/prices/?from=${data.from}&to=${data.to}&amount=${data.amount}&fromDecimals=${data.fromDecimals}&toDecimals=${data.toDecimals}&side=${data.side}&network=${data.network}`),
});

export const getTokenList = (networkId) => ({
  type: actionTypes.GET_TOKEN_LIST,
  payload: api.get(`tokens/${networkId}`),
});

export const setTokenList = (data) => ({
  type: actionTypes.SET_TOKEN_LIST,
  payload: data,
});


