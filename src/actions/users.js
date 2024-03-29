import api from '../api';

export const USERS_REQUEST = 'USERS_REQUEST';
export const USERS_ERROR = 'USERS_ERROR';
export const USERS_SUCCESS = 'USERS_SUCCESS';

function requestUsers() {
  return {
    type: USERS_REQUEST,
    isFetching: true,
    error: null,
  }
}

function usersError(error) {
  return {
    type: USERS_ERROR,
    isFetching: true,
    users: [],
    error: error,
  }
}

function receiveUsers(users) {
  return {
    type: USERS_SUCCESS,
    isFetching: false,
    users,
    error: null,
  }
}

export const fetchUsers = (query) => {    
  if(!query) query = '';
  return async (dispatch) => {
    dispatch(requestUsers());
    let users;
    try {
      users = await api.get('/users'+ query);
      console.log('/users' + query);
      
      console.info(users.result);
    } catch (e) {
      return dispatch(usersError(e))
    }

    dispatch(receiveUsers(users.result));
  }
}

export const fetchUserName = (id) => {
  return async (dispatch) => {
    dispatch(requestUsers());
    let name;
    try {
      name = await api.get(id);
    } catch (e) {
      return dispatch(usersError(e))
    }
    dispatch(receiveUsers(name.result.name));
  }
}

export const fetchUsersBookList = (url) => {
  return async (dispatch) => {
    dispatch(requestUsers());

    let users;
    try {
      users = await api.get('/users');
      console.info(users.result);
    } catch (e) {
      return dispatch(usersError(e))
    }

    dispatch(receiveUsers(users.result));
  }
}
