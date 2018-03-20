import * as actionTypes from './actionTypes';
import axios from './../../axios-stories';

export const authenticationStart = () => {
  return {
    type: actionTypes.AUTHENTICATION_START
  };
};

export const authenticationSuccess = (authData) => {
  return {
    type: actionTypes.AUTHENTICATION_SUCCESS,
    authData: authData
  };
};

export const authenticationFail = (error) => {
  return {
    type: actionTypes.AUTHENTICATION_FAIL,
    error: error
  };
};

export const authenticationLogout = () => {
  return {
    type: actionTypes.AUTHENTICATION_LOGOUT
  };
};

export const authentication = (email, password) => {
  return dispatch => {
    dispatch(authenticationStart());
    axios.post('/login', {
      email,
      password
    }).then(response => {
      let authData = response.data;
      authData['x-auth'] = response.headers['x-auth'];
      dispatch(authenticationSuccess(authData));
    }).catch(error => {
      dispatch(authenticationFail(error.response.data));
    });
  }
};
