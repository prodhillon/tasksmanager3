import React from 'react';
import ReactDOM from 'react-dom';
import { Provider, connect } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import {  Redirect } from 'react-router';


import Nav from './nav';
import Feed from './feed';
import Users from './users';
import TaskForm from './task-form';
import UpdateTask from './update-task';
import UpdateUser from './update-user';
import UserForm from './user-form';
import Session from './nav';

export default function tasksmanager_init(store) {
  ReactDOM.render(
    <Provider store={store}>
      <Tasksmanager state={store.getState()} />
    </Provider>,
    document.getElementById('root'),
  );
}

let Tasksmanager = connect((state) => state)((props) => {
  return (
    <Router>
      <div>
        <Nav />
        <Route exact path="/" render={() => (
          props.token ? (
            <Redirect to={"/feed/"+props.token.user_id}/>
          ) : (
            <div>Welcome to Tasksmanager !!
            <br/><p align="right">....For tracking your tasks easily</p></div>
          )
        )}/>

        <Route path="/task/new" exact={true} render={({history}) =>
          <div>
            <TaskForm history={history}/>
          </div>
        } />
        <Route path="/feed/:user_id" exact={true} render={({match,history}) =>
          <div>
          <Feed tasks={_.filter(props.tasks, (pp) =>
            match.params.user_id == pp.user.id )
          } history={history} />
          </div>
        } />
        <Route path="/users/new" exact={true} render={({history}) =>
          <div>
            <UserForm history={history}/>
          </div>
        } />
        <Route path="/users" exact={true} render={() =>
          <Users users={props.users} />
        } />
        <Route path="/users/:user_id" render={({match}) =>
          <Users users={_.filter(props.users, (pp) =>
            match.params.user_id == pp.id )
          } />
        } />
        <Route path="/tasks/:task_id" exact={true} render={({match,history}) =>
          <div>
          <UpdateTask tasks={_.filter(props.tasks, (pp) =>
            match.params.task_id == pp.id )
          } history={history} />
          </div>
        } />
        <Route path="/users/edit/:user_id"  render={({match,history}) =>
          <div>
          <UpdateUser users={_.filter(props.users, (pp) =>
            match.params.user_id == pp.id )
          } history={history}/>
          </div>
        } />
      </div>
    </Router>
  );
});
