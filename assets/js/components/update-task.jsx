import React from 'react';
import { connect } from 'react-redux';
import { Button, FormGroup, Label, Input } from 'reactstrap';
import api from '../api';
import Task from './task';

function UpdateTask(props) {
  //console.log("Here Details", props.tasks[0].id);
  console.log("Here Details----->", props.formTask);

  //props.form = props.tasks[0];
  function update(ev) {
    let tgt = $(ev.target);
    let data = {};
    //data['id'] = props.tasks[0].id
    //console.log("-Task ID-->",data['id'])
    data[tgt.attr('name')] = tgt.val();
    let action = {
      type: 'POPULATE_UPDATE_TASK_FORM',
      data: data,
    };
    console.log("Final Data",data);
    console.log(action);
    props.dispatch(action);
  }

  function submit(ev) {
    ev.preventDefault();
    let validerror = true;
    let timespent = props.formTask.timespent % 15;
    console.log("timespent is" + timespent);

    if(props.formTask.title === ''){
      validerror = false;
      alert ("Please enter task title");
    }
    else if(props.formTask.description === ''){
      validerror = false;
      alert ("Please enter task description");
    }
    else if(props.formTask.timespent < 0){
      validerror = false;
      alert ("Please enter timespent greater than or equal to 0");
    }
    else if(timespent != 0){
      validerror = false;
      alert ("Please enter time spent in increments of 15");
    }

    if(validerror){
      api.update_task(props.formTask,props.tasks[0].id,props.history);
    }
    console.log(props.formTask);
  }

  function clear(ev) {
    props.dispatch({
      type: 'CLEAR_FORM',
    });
  }


  let users = _.map(props.users, (uu) => <option key={uu.id} value={uu.id}>{uu.name}</option>);
  return <div style={{padding: "4ex"}}>
    <h2>Update Task</h2>
    <FormGroup>
      <Label for="user_id">User</Label>
      <Input type="select" name="user_id" value={props.formTask.user_id} onChange={update}>
        { users }
      </Input>
    </FormGroup>
    <FormGroup>
      <Label for="title">Title</Label>
      <Input type="textarea" name="title" value={props.formTask.title} onChange={update} />
    </FormGroup>
    <FormGroup>
      <Label for="description">Description</Label>
      <Input type="textarea" name="description" value={props.formTask.description} onChange={update} />
    </FormGroup>
    <FormGroup>
      <Label for="timespent">Timespent (in minutes)</Label>
      <Input type="number" step="15" min="0" name="timespent" value={props.formTask.timespent} onChange={update} />
    </FormGroup>
    <FormGroup>
      <Label for="completed">Task Status</Label>
      <Input type="select" name="completed" value={props.formTask.completed} onChange={update}>
      <option value="--None--">None</option>
      <option value="Completed">Completed</option>
      <option value="In-Progress">In-Progress</option>
      <option value="Not-Started">Not Started</option>
      </Input>
    </FormGroup>
    <Button onClick={submit} color="primary">Update Task</Button> &nbsp;
  </div>;
}

function state2props(state) {
  console.log("rerender@UpdateTask", state);
  return {
    formTask: state.taskData,
    users: state.users,
  };
}

export default connect(state2props)(UpdateTask);
