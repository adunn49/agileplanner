import React, {Component} from 'react';
import Aux from '../../../hoc/Aux/Auxillary';
import Modal from '../../UI/Modal/Modal';
import TaskEdit from './TaskEdit';

class Tasks extends Component {

  TASK_STATE = [
      'No Started',
      'In Progress',
      'Complete'
    ];

  state = {
    showEditModal: false,
    editedTask: null,
    tasks: {
      0: {
        storyId: 1,
        taskName: 'Code',
        taskEstimate: 10,
        taskTodo: 8,
        taskOwner: 1,
        taskStatus: 1
      },
      1: {
        storyId: 1,
        taskName: 'Test',
        taskEstimate: 4,
        taskTodo: 4,
        taskOwner: 1,
        taskStatus: 0
      }
    }
  }

  closeEditModal = () => {
    this.setState({
      showEditModal: false
    });
  }

  editTask = (key) => {
    this.setState({
      showEditModal: true,
      editedTaskKey: key,
      editedTask: {...this.state.tasks[key]}
    })
  }

  cancelEditTask = () => {
    this.setState({
      showEditModal: false,
      editedTask: null
    })
  }

  applyEditTask = () => {
    let editedTask = {...this.state.editedTask};
    let tasks = {...this.state.tasks};
    tasks[this.state.editedTaskKey] = editedTask;
    this.setState({
      showEditModal: false,
      editedTaskKey: null,
      editedTask: null,
      tasks: tasks
    })
  }

  handleInputChange = (event, fieldName) => {
    let editedTask = {...this.state.editedTask};
    editedTask[fieldName] = event.target.value;
    this.setState({
      editedTask: editedTask
    });
  }


  render() {
    let items = [];
    console.log(this);
    Object.keys(this.state.tasks).forEach(key => {
      items.push(<tr key={key}>
          <td>{this.state.tasks[key].taskName}</td>
          <td>{this.TASK_STATE[parseInt(this.state.tasks[key].taskStatus, 10)]}</td>
          <td>{this.state.tasks[key].taskEstimate}</td>
          <td>{this.state.tasks[key].taskTodo}</td>
          <td>{this.state.tasks[key].taskOwner}</td>
          <td>
            <button className={'btn btn-sm btn-default'} onClick={() => this.editTask(key)}>Edit</button>
            <button className={'btn btn-sm btn-default'}>Delete</button>
          </td>
        </tr>
      );
    });
    return (
      <Aux>
        <h1>Tasks</h1>
        <table className={['table', 'table-striped'].join(' ')}>
          <thead>
            <th>Task</th>
            <th>Status</th>
            <th>Estimate (hrs)</th>
            <th>To do (hrs)</th>
            <th>Owner</th>
            <th></th>
          </thead>
          <tbody>
            {items}
          </tbody>
        </table>
        <button className={'btn btn-sm btn-default'}>Add Task</button>
        <Modal show={this.state.showEditModal}>
          <TaskEdit task={this.state.editedTask}
            onCancel={this.cancelEditTask}
            onAccept={this.applyEditTask}
            onChange={this.handleInputChange}
            clicked={this.closeEditModal}></TaskEdit>
        </Modal>
      </Aux>
    );
  }
}

Tasks.TASK_STATE = [
    'No Started',
    'In Progress',
    'Complete'
  ];

export default Tasks;
