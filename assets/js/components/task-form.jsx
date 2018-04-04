import React from 'react';
import { connect } from 'react-redux';
import { Button, FormGroup, Label, Input } from 'reactstrap';
import api from '../api';
import classnames from 'classnames'

function TaskForm(props) {
  console.log("props@TaskForm", props);

  function update(ev) {
    let tgt = $(ev.target);
    let data = {};
    data[tgt.attr('name')] = tgt.val();
    let action = {
      type: 'UPDATE_FORM',
      data: data,
    };
    console.log(action);
    props.dispatch(action);
  }

  function submit(ev) {
    ev.preventDefault();
    let validerror = true;
    let timespent = props.form.timespent % 15;
    console.log("timespent is" + timespent);

    if(props.form.title === ''){
      validerror = false;
      alert ("Please enter task title");
    }
    else if(props.form.description === ''){
      validerror = false;
      alert ("Please enter task description");
    }
    else if(props.form.timespent < 0){
      validerror = false;
      alert ("Please enter timespent greater than or equal to 0");
    }
    else if(timespent != 0){
      validerror = false;
      alert ("Please enter time spent in increments of 15");
    }

    if(validerror){
      api.submit_task(props.form,props.history);
      console.log(props.form);
    }
  }

  function clear(ev) {
    props.dispatch({
      type: 'CLEAR_FORM',
    });
  }

  let users = _.map(props.users, (uu) => <option key={uu.id} value={uu.id}>{uu.name}</option>);
  return <div style={{padding: "4ex"}}>
    <h2>Create New Task</h2>
    <FormGroup>
      <Label for="user_id">Assigned To User</Label>
      <Input type="select" name="user_id" value={props.form.user_id} onChange={update}>
        { users }
      </Input>
    </FormGroup>
    <FormGroup>
      <Label for="title">Title</Label>
      <Input type="text" name="title" value={props.form.title} onChange={update} required/>
    </FormGroup>
    <FormGroup>
      <Label for="description">Description</Label>
      <Input type="textarea" name="description" value={props.form.description} onChange={update} />
    </FormGroup>
    <FormGroup>
      <Label for="timespent">Timespent (in minutes)</Label>
      <Input type="number" step="15" min="0" name="timespent" value={props.form.timespent} onChange={update} />
    </FormGroup>
    <FormGroup>
      <Label for="completed">Task Status</Label>
      <Input type="select" name="completed" value={props.form.completed} onChange={update}>
      <option value="--None--">None</option>
      <option value="Completed">Completed</option>
      <option value="In-Progress">In-Progress</option>
      <option value="Not-Started">Not Started</option>
      </Input>
    </FormGroup>
    <Button onClick={submit} color="primary">Create Task</Button> &nbsp;
  </div>;
}

function state2props(state) {
  console.log("rerender@TaskForm", state);
  return {
    form: state.form,
    users: state.users,
  };
}

export default connect(state2props)(TaskForm);
