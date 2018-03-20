import * as actionTypes from '../actions/actionTypes';
import {updateObject} from '../../common/utilties';

const initialState = {
  token: null,
  userId: null,
  error: null,
  loading: false
};

const authenticationStart = (state, action) => {
  return updateObject(state, { error: null, loading: true});
};

const authenticationSuccess = (state, action) => {
  console.log(action, 'auth success future');
  return updateObject(state, { error: null, loading: false, token: action.authData['x-auth'], userId: action.authData._id});
};

const authenticationFail = (state, action) => {
  console.log(action);
  return updateObject(state, { error: action.error });
}

const authenticationLogout = (state, action) => {
  console.log('authenticationLogout');
  return updateObject(state, { token: null, userId: null});
};

const reducers = ( state = initialState, action ) => {
  switch (action.type) {
    case actionTypes.AUTHENTICATION_START: return authenticationStart(state, action);
    case actionTypes.AUTHENTICATION_FAIL: return authenticationFail(state, action);
    case actionTypes.AUTHENTICATION_SUCCESS: return authenticationSuccess(state, action);
    case actionTypes.AUTHENTICATION_LOGOUT: return authenticationLogout(state, action);
    default: return state;
  }
}

export default reducers;
