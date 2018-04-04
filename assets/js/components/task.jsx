import React from 'react';
import { Card, CardBody } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Button, FormGroup, Label, Input } from 'reactstrap';
import api from '../api';
import { connect } from 'react-redux';




function Task(params) {

   function delete1(ev) {
    console.log("Inside Delete",params.task.id);
    api.delete_task(params.task.id,params.history);
  }
  function updatetask(params) {
    api.fetchFormData(params.task)
  }
  let task = params.task;
  return <Card>
    <CardBody>
      <div>
        <p>Assigned To: <b>{ task.user.name }</b> | Title: <b>{ task.title }</b> | Timespent: <b>{ task.timespent }</b></p>
        <p>Description: <b>{ task.description }</b> | Status: <b>{ task.completed }</b></p>
        <Link  to={"/tasks/" + task.id} onClick={() => {updatetask(params)}}>Update Task</Link>
        <Button onClick={delete1} color="danger">Delete Task</Button> &nbsp;
      </div>
    </CardBody>
  </Card>;
}

function state2props(state) {
  console.log("rerender@Task", state);
  return {
    form: state.form,
    users: state.users,
  };
}

export default connect(state2props)(Task);
