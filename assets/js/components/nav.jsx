import React from 'react';
import { NavLink } from 'react-router-dom';
import { Form, FormGroup, NavItem, Input, Button } from 'reactstrap';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import api from '../api';

let LoginForm = connect(({login}) => {return {login};})((props) => {
  function update(ev) {
    let tgt = $(ev.target);
    let data = {};
    data[tgt.attr('name')] = tgt.val();
    props.dispatch({
      type: 'UPDATE_LOGIN_FORM',
      data: data,
    });
  }

  function create_token(ev) {
      if(props.login.email === ''){
       alert ("Please enter your email id");
     }
     else if(props.login.password === ''){
       alert ("Please enter your password");
     }
    if(props.login.email != '' && props.login.password != ''){
      api.submit_login(props.login);
    }
    console.log(props.login);
  }

  function createUser(ev){
    console.log("Inside new");
    api.fetchNewUserData();
  }


  return <div className="navbar-text">
    <Form inline>
      <FormGroup>
        <Input type="email" name="email" placeholder="email"
               value={props.login.email} onChange={update} />
      </FormGroup>
      <FormGroup>
        <Input type="password" name="password" placeholder="password"
               value={props.login.password} onChange={update} />
      </FormGroup>
      <Button onClick={create_token}>Log In </Button>
      <Link to={"/users/new"} onClick={createUser}>  Create New User</Link>

    </Form>
  </div>;
});

let Session = connect(({token}) => {return {token};})((props) => {

    function log_out(ev) {
      console.log("Inside logout");
      api.submit_logout(props.token);
    }

  return <div className="navbar-text">
  <span className="navbar-brand">
    Welcome { props.token.user_name} !!
  </span>


  <ul className="navbar-nav mr-auto">
    <NavItem>
      <NavLink to={"/feed/"+props.token.user_id} exact={true} activeClassName="active" className="nav-link">Your Feed | </NavLink>
    </NavItem>
    <NavItem>
      <NavLink to="/task/new" href="#" className="nav-link">Create New Task | </NavLink>
    </NavItem>
    <NavItem>
      <NavLink to={"/users/"+props.token.user_id} exact={true} href="#" className="nav-link">Your Profile&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</NavLink>
    </NavItem>
    <Link to="/" onClick={log_out} className="nav-link">Log Out</Link>
  </ul>

  </div>;
});

function Nav(props) {
  let session_info;

  if (props.token) {
    session_info = <Session token={props.token} />;
  }
  else {
    session_info = <LoginForm />
  }

  return (
    <nav className="navbar navbar-dark bg-dark navbar-expand">
      { session_info }
    </nav>
  );
}

function state2props(state) {
  return {
    token: state.token,
  };
}

export default connect(state2props)(Nav);
