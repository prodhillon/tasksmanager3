import React from 'react';
import { connect } from 'react-redux';
import { Button, FormGroup, Label, Input } from 'reactstrap';
import api from '../api';
import Task from './task';

function UpdateUser(props) {
  console.log("Here Details", props.users[0].id);

  function update(ev) {
    let tgt = $(ev.target);
    let data = {};
    data['id'] = props.users[0].id;
    console.log("-User ID-->",data['id'])
    data[tgt.attr('name')] = tgt.val();
    let action = {
      type: 'USER_PROFILE_UPDATE_FORM',
      data: data,
    };
    console.log("Final Data",data);
    console.log(action);
    props.dispatch(action);
  }

  function submit(ev) {
    let regexemail = /\S+@\S+/;
    let boolemail = regexemail.test(props.updatelogin.email);
    let validerror = true;
    console.log("boolemail"+boolemail);
    if(props.updatelogin.name === ''){
       validerror = false;
       alert ("Please enter your username");
     }
     else if(props.updatelogin.email === ''){
       validerror = false;
       alert ("Please enter your email id");
     }
     else if(boolemail == false){
       validerror = false;
       alert ("Please enter email in proper format");
     }
     else if(props.updatelogin.password === ''){
       validerror = false;
       alert ("Please enter your password");
     }
     else if(props.updatelogin.password.length < 8){
       validerror = false;
       alert ("Password must be atleast of 8 characters");
     }
    if(validerror){
      console.log("Inside Submit",props.updatelogin);
      api.update_user(props.updatelogin,props.users[0].id,props.history);
    }
    console.log(props.updatelogin);
  }

  function clear(ev) {
    props.dispatch({
      type: 'CLEAR_LOGIN_FORM',
    });
  }

  return <div style={{padding: "4ex"}}>
    <h2>Update Profile</h2>
    <FormGroup>
      <Label for="name">User Name</Label>
      <Input type="name" name="name" value={props.updatelogin.name} onChange={update} />
    </FormGroup>
    <FormGroup>
      <Label for="email">User Email&nbsp; <i>(example@example.com)</i></Label>
      <Input type="email" name="email" value={props.updatelogin.email} onChange={update} />
    </FormGroup>
    <FormGroup>
      <Label for="password">Password&nbsp; <i>(should be greater than 8 characters)</i></Label>
      <Input type="password" name="password" value={props.updatelogin.password} onChange={update} />
    </FormGroup>
    <Button onClick={submit} color="primary">Update</Button> &nbsp;
    <Button onClick={clear}>Clear</Button>
  </div>;
}

function state2props(state) {
  console.log("rerender@UpdateUser", state);
  return {
    updatelogin: state.updateuser,
    token: state.token,
  };
}

export default connect(state2props)(UpdateUser);
