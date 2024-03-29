
/**
 * Ef redux er notað skal skilgreina allar actions fyrir auth hér og
 * síðan í annari skrá fyrir aðra virkni.
 * Í async "thunks" ætti þá að gera vefþjónustuköll
 */
import api from '../api';

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAILURE = 'REGISTER_FAILURE';
export const REGISTER_REQUEST = 'REGISTER_REQUEST';
export const UPDATE_SUCCESS = 'UPDATE_SUCCESS';
export const UPDATE_FAILURE = 'UPDATE_FAILURE';
export const UPDATE_REQUEST = 'UPDATE_REQUEST';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const LOGIN_LOGOUT = 'LOGIN_LOGOUT';

function requestLogin() {
  return {
    type: LOGIN_REQUEST,
    isFetching: true,
    isAuthenticated: false,
    message: null,
  }
}

function receiveLogin(user) {
  return {
    type: LOGIN_SUCCESS,
    isFetching: false,
    isAuthenticated: true,
    user,
    message: null,
  }
}

function loginError(message) {
  return {
    type: LOGIN_FAILURE,
    isFetching: false,
    isAuthenticated: false,
    message
  }
}
function requestRegister() {
  return {
    type: REGISTER_REQUEST,
    isFetching: true,
    isAuthenticated: false,
    message: null,
  }
}

function registerError(message) {
  return {
    type: REGISTER_FAILURE,
    isFetching: false,
    isAuthenticated: false,
    message
  }
}

function receiveRegister(user) {
  return {
    type: REGISTER_SUCCESS,
    isFetching: false,
    isAuthenticated: false,
    user,
    message: null,
  }
}
function requestUpdate() {
  return {
    type: UPDATE_REQUEST,
    isFetching: true,
    isAuthenticated: false,
    message: null,
  }
}

function registerUpdate(message) {
  return {
    type: UPDATE_FAILURE,
    isFetching: false,
    isAuthenticated: false,
    message
  }
}

function receiveUpdate(user) {
  return {
    type: UPDATE_SUCCESS,
    isFetching: false,
    isAuthenticated: true,
    user,
    message: null,
  }
}

function logout() {
  return {
    type: LOGIN_LOGOUT,
    isFetching: false,
    isAuthenticated: false,
    user: null,
  }
}

// Thunk!
export const loginUser = (username, password) => {
  return async (dispatch) => {
    dispatch(requestLogin());

    let login;
    try {
      login = await api.login(username, password);
    } catch (e) {
      return dispatch(loginError(e))
    }
    if (!login.loggedin) {
      return dispatch(loginError(login.error))
    }

    if (login.loggedin) {
      const { user } = login;
      console.info(login);
      localStorage.setItem('user', JSON.stringify(user));
      dispatch(receiveLogin(user));
    }
  }
}
// Thunk!
export const registerUser = (username, name, password) => {
  return async (dispatch) => {
    dispatch(requestRegister());
    let register;
    try {
      register = await api.register(username, name, password);
    } catch (e) {
      return dispatch(registerError(e))
    }

    if (register.errors) {
      dispatch(registerError(register.errors[0].message))
      return false;
    }
    if(!register.errors){
      dispatch(receiveRegister(register));
      return true;
    }
  }
}

export const logoutUser = () => {
  return async (dispatch) => {
    localStorage.removeItem('user');
    dispatch(logout());
  }
}

export const updatePhoto = (file) => {
  return async (dispatch) => {
    dispatch(requestUpdate());
    let update;
    console.info(file);
    try{
      update = await api.photo('/users/me/profile', file.file);
    }catch(e){
      console.info(e);
      return dispatch(registerUpdate(e));
    }
    if(update.result.error){
      dispatch(registerUpdate(update.result.error));
    }else{
      localStorage.removeItem('user');
      localStorage.setItem('user', JSON.stringify(update.result));
      dispatch(receiveUpdate(update.result));
    }
  }
}
export const updateUser = (data) => {
  return async (dispatch) => {
    dispatch(requestUpdate());
    let update;
    try{
      update = await api.patch('/users/me', data);
    }catch(e){
      return dispatch(registerUpdate(e));
    }
    if(update.result.errors){
      dispatch(registerUpdate(update.result.errors));
    }else{
      localStorage.removeItem('user');
      localStorage.setItem('user', JSON.stringify(update.result));
      dispatch(receiveUpdate(update.result));
    }
  }
}

