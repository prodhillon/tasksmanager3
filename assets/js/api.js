import store from './store';
import { browserHistory } from 'react-router'


class TheServer {

  request_tasks() {
    $.ajax("/api/v1/tasks", {
      method: "get",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      success: (resp) => {
        store.dispatch({
          type: 'TASKS_LIST',
          tasks: resp.data,
        });
      },
    });
  }

  request_users() {
    $.ajax("/api/v1/users", {
      method: "get",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      success: (resp) => {
        store.dispatch({
          type: 'USERS_LIST',
          users: resp.data,
        });
      },
    });
  }

  submit_task(data,history) {
    console.log("inside create",data);
    let uid = data.user_id;
    $.ajax("/api/v1/tasks", {
      method: "post",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      data: JSON.stringify({ token: data.token, task: data }),
      success: (resp) => {
        store.dispatch({
          type: 'ADD_TASK',
          task: resp.data,
        });
        console.log("uid"+uid);
        let data ={
          user_id: uid,
          title: "",
          timespent: "",
          description: "",
          completed: "",
        }

        store.dispatch({
          type: 'UPDATE_FORM',
          data: data,
        });
        history.push('/')
        alert("Task created successfully.");
      },
    });
  }

  submit_user(data,history) {
    console.log("hereee--->",data);
    $.ajax("/api/v1/users", {
      method: "post",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      data: JSON.stringify({ token: data.token, user: data }),
      success: (resp) => {
        store.dispatch({
          type: 'ADD_USER',
          user: resp.data,
        });
        history.push('/')
        alert("User created successfully.");
      },
      error: (error) => {
        alert("Validation Error Occured");
      }
    });
  }

  update_user(data,user_id,history) {
    console.log("herrr",user_id);
    $.ajax("/api/v1/users/"+user_id, {
      method: "post",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      data: JSON.stringify({ token: data.token, user: data }),
      success: (resp) => {
        store.dispatch({
          type: 'UPDATE_USER',
          user: resp.data,
        });
        this.request_users();
        this.request_tasks();

        store.dispatch({
          type: 'DELETE_TOKEN',
          token: null,
        });

        store.dispatch({
          type: 'CLEAR_LOGIN_FORM',
        });

        alert("User updated successfully. Please log in again");
        history.push('/')
      },
    });
  }

  update_task(data,task_id,history) {
    console.log("herrr",task_id);
    $.ajax("/api/v1/tasks/"+task_id, {
      method: "post",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      data: JSON.stringify({ token: data.token, task: data }),
      success: (resp) => {
        this.request_tasks();
        history.push('/')
        alert("Task updated successfully.");
      },
      error: (error) => {
        alert("Validation Errors");
      }
    });
  }

  delete_task(task_id,history) {
    console.log("del",task_id);
    $.ajax("/api/v1/tasks/"+task_id, {
      method: "delete",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      success: (resp) => {
        store.dispatch({
          type: 'DELETE_TASK',
        });
        this.request_tasks();

        history.push('/')
        alert("Task deleted successfully.");
      },
    });
  }

  delete_user(user_id) {
    console.log("del",user_id);
    $.ajax("/api/v1/users/"+user_id, {
      method: "delete",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      success: (resp) => {
        store.dispatch({
          type: 'DELETE_USER',
        });
        store.dispatch({
          type: 'DELETE_TOKEN',
          token: null,
        });

        store.dispatch({
          type: 'CLEAR_LOGIN_FORM',
        });

        alert("User deleted successfully.");
      },
      error: (error) => {
        alert("Validation errors occured");
      }
    });
  }

  submit_login(data) {
    console.log("data here is",data);
    $.ajax("/api/v1/token", {
      method: "post",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      data: JSON.stringify(data),
      success: (resp) => {
        store.dispatch({
          type: 'SET_TOKEN',
          token: resp,
        });
    },
    error: (error) => {
      alert("User not Found or Invalid credentials");
    }
    });
  }

  submit_logout(token_id) {

        store.dispatch({
          type: 'DELETE_TOKEN',
          token: null,
        });
        store.dispatch({
          type: 'CLEAR_LOGIN_FORM',
        });
  


  }

  fetchFormData(taskParams) {
    let data ={
      user_id: taskParams.user.id,
      title: taskParams.title,
      timespent: taskParams.timespent,
      description: taskParams.description,
      completed: taskParams.completed,
    }
    store.dispatch({
      type: 'POPULATE_UPDATE_TASK_FORM',
      data: data,
    });
  }

  fetchNewUserData() {
    store.dispatch({
      type: 'NEW_USER_LOGIN_FORM',
    });
  }

  fetchUserUpdateData() {
    store.dispatch({
      type: 'USER_PROFILE_UPDATE_FORM',
    });
  }



}

export default new TheServer();
