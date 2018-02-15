import React from 'react';
import Tasks from './Tasks';
import Aux from '../../../hoc/Aux/Auxillary';

const editTask = (props) => {
  if (props.task === null) {
    return null;
  }
  return (
    <Aux>
      <h3>Edit Task</h3>
      <form>
        <div className="form-group">
          <label htmlFor="TaskName">Task</label>
          <input type="text"
            className="form-control"
            value={props.task.taskName}
            onChange={(event) => props.onChange(event, 'taskName')}
            id="TaskName"
            placeholder="Enter Task Name" />
        </div>
        <div className="form-group">
          <label htmlFor="TaskStatus">Status</label>
          <select className="form-control" id="TaskStatus">
            {
              Tasks.TASK_STATE.map((state, index) => {
                return <option value={index}>{state}</option>;
              })
            }
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="TaskEstimate">Estimate (hrs)</label>
          <input type="text"
            className="form-control"
            id="TaskEstimate"
            placeholder="Enter Estimate in Hours" />
        </div>
        <div className="form-group">
          <label htmlFor="TaskTodo">To do (hrs)</label>
          <input type="text"
            className="form-control"
            id="TaskTodo"
            placeholder="Enter To do in Hours" />
        </div>
      </form>
      <div className="pull-right">
        <button className="btn btn-default" onClick={props.onCancel}>Cancel</button>
        <button className="btn btn-success" onClick={props.onAccept}>Accept</button>
      </div>
    </Aux>
  );
};

export default editTask;
