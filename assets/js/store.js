import { createStore, combineReducers } from 'redux';
import deepFreeze from 'deep-freeze';

/*
 *  state layout:
 *  {
 *   tasks: [... Tasks ...],
 *   users: [... Users ...],
 *   form: {
 *     user_id: null,
 *     body: "",
 *   }
 * }
 *
 * */

function tasks(state = [], action) {
  switch (action.type) {
  case 'TASKS_LIST':
    return [...action.tasks];
  case 'ADD_TASK':
    return [action.task, ...state];
  case 'UPDATE_TASK':
    return [action.task, ...state];
  case 'DEL':
      return [...state];
  default:
    return state;
  }
}

function users(state = [], action) {
  switch (action.type) {
  case 'USERS_LIST':
    return [...action.users];
  case 'ADD_USER':
    return [action.user, ...state];
  case 'UPDATE_USER':
      return [action.user, ...state];
  default:
    return state;
  }
}

let empty_form = {
  user_id: "",
  title: "",
  timespent: 0,
  description: "",
  completed: "--None--",
  token: "",
};

let task_form = {
  user_id: "",
  title: "",
  timespent: 0,
  description: "",
  completed: "--None--",
  token: "",
};

function taskData(state = task_form, action) {
  console.log("Inside store");
  console.log(action.data);
  switch (action.type) {
    case 'POPULATE_UPDATE_TASK_FORM':
      return Object.assign({}, state, action.data);
    default:
      return state;
  }
}


function form(state = empty_form, action) {
  console.log("Inside store");

  console.log(action.data);

  switch (action.type) {
    case 'UPDATE_FORM':
      return Object.assign({}, state, action.data);
    case 'UPDATE_TASK_FORM':
      return Object.assign({}, state, action.data);
    case 'CLEAR_FORM':
      return empty_form;
    case 'SET_TOKEN':
      return Object.assign({}, state, action.token);
    case 'DELETE_TOKEN':
        return Object.assign({}, state, action.token);
    default:
      return state;
  }
}

function token(state = null, action) {
  switch (action.type) {
    case 'SET_TOKEN':
      return action.token;
    case 'DELETE_TOKEN':
        return action.token;
    default:
      return state;
  }
}

let empty_login = {
  name: "",
  email: "",
  password: "",
};

let new_login = {
  name: "",
  email: "",
  password: "",
};

let update_login = {
  name: "",
  email: "",
  password: "",
};

function login(state = empty_login, action) {
  switch (action.type) {
    case 'UPDATE_LOGIN_FORM':
      return Object.assign({}, state, action.data);
    case 'NEW_LOGIN_FORM':
      return Object.assign({}, state, action.data);
    case 'CLEAR_LOGIN_FORM':
      return empty_login;
    default:
      return state;
  }
}

function newuser(state = new_login, action) {
  switch (action.type) {
    case 'NEW_USER_LOGIN_FORM':
      return Object.assign({}, state, action.data);
    default:
      return state;
  }
}

function updateuser(state = update_login, action) {
  switch (action.type) {
    case 'USER_PROFILE_UPDATE_FORM':
      return Object.assign({}, state, action.data);
    default:
      return state;
  }
}

function root_reducer(state0, action) {
  console.log("reducer", action);
  // {tasks, users, form} is ES6 shorthand for
  // {tasks: tasks, users: users, form: form}
  let reducer = combineReducers({tasks, users, form, token, login, taskData, newuser, updateuser});
  let state1 = reducer(state0, action);
  console.log("state1", state1);
  return deepFreeze(state1);
};

let store = createStore(root_reducer);
export default store;
