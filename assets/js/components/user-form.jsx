import React from 'react';
import { connect } from 'react-redux';
import { Button, FormGroup, Label, Input } from 'reactstrap';
import api from '../api';

function UserForm(props) {
  console.log("props@UserForm", props);

  function update(ev) {
    let tgt = $(ev.target);
    let data = {};
    data[tgt.attr('name')] = tgt.val();
    let action = {
      type: 'NEW_USER_LOGIN_FORM',
      data: data,
    };
    console.log(action);
    props.dispatch(action);
  }

  function submit(ev) {
    let regexemail = /\S+@\S+/;
    let boolemail = regexemail.test(props.newlogin.email);
    let validerror = true;
    console.log("boolemail"+boolemail);
    if(props.newlogin.name === ''){
       validerror = false;
       alert ("Please enter your username");
     }
     else if(props.newlogin.email === ''){
       validerror = false;
       alert ("Please enter your email id");
     }
     else if(boolemail == false){
       validerror = false;
       alert ("Please enter email in proper format");
     }
     else if(props.newlogin.password === ''){
       validerror = false;
       alert ("Please enter your password");
     }
     else if(props.newlogin.password.length < 8){
       validerror = false;
       alert ("Password must be atleast of 8 characters");
     }
    if(validerror){
      api.submit_user(props.newlogin,props.history);
    }
    console.log(props.newlogin);
  }

  function clear(ev) {
    props.dispatch({
      type: 'CLEAR_FORM',
    });
  }

  return <div style={{padding: "4ex"}}>
    <h2>New User</h2>
    <FormGroup>
      <Label for="user_id">User Name</Label>
      <Input type="text" name="name" value={props.newlogin.name} onChange={update} />
    </FormGroup>
    <FormGroup>
      <Label for="email">User Email&nbsp; <i>(example@example.com)</i></Label>
      <Input type="email" name="email" value={props.newlogin.email} onChange={update} />
    </FormGroup>
    <FormGroup>
      <Label for="password">Password&nbsp; <i>(should be greater than 8 characters)</i></Label>
      <Input type="password" name="password" value={props.newlogin.password} onChange={update} />
    </FormGroup>
    <Button onClick={submit} color="primary">Create User</Button> &nbsp;
  </div>;
}

function state2props(state) {
  console.log("rerender@UserForm", state);
  return {
    newlogin: state.newuser,
  };
}

export default connect(state2props)(UserForm);
