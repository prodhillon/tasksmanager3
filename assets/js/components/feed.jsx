import React from 'react';
import Task from './task';
import { connect } from 'react-redux';

export default function Feed(params) {
  let tasks = _.map(params.tasks, (pp) => <Task key={pp.id} task={pp} history={params.history}/>);
  return <div>
    { tasks }
  </div>;
}
