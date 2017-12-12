import React, { Component } from 'react';
import {FormGroup, ControlLabel, FormControl} from 'react-bootstrap';
import { connect } from 'react-redux';

import * as actionTypes from '../../store/actions';
import * as actions from '../../store/actions';
import classes from './EditStory.css';
import axios from '../../axios-stories';

/**
 * A Component for adding or editing a new user story.
 */
class EditStory extends Component {

  state = {
    /* This will be used for a new user story. */
    story: {
      title: '',
      storyStatus: '0'
    },
    isEditing: false
  };

  /**
   * componentDidMount - If story is passed in on the props then load this into state.
   */
  componentDidMount() {
    if (this.props.match.params.id) {
      this.setState({
        isEditing: true
      })
      this.props.onInitStory(this.props.match.params.id);
      console.log(this.props);
    } else {
      this.setState({
        isEditing: false
      })
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.story) {
      let story = {...nextProps.story};
      this.setState({
        story: story
      });
    }
  }

  /**
   * Called when the user types in an input field.
   */
  handleChange = (event, controlId) => {
    let story = {
      ...this.state.story
    };
    story[controlId] = event.target.value;
    this.setState({
      story: story
    });
  }

  /**
   * Called when the user clicks the save button. This commits the new user story
   * to the server and returns to the planning page.
   */
  doSaveHandler = () => {
    if (this.state.isEditing) {
      let story = {...this.state.story};
      let id = '' + story.id;
      delete story.id;
      axios.patch('/stories/' + id + '.json', {...this.state.story})
        .then(response => {
          this.props.history.push({pathname: '/planning'})
        });
    } else {
      axios.post('/stories.json', {...this.state.story})
        .then(response => {
          this.props.history.push({pathname: '/planning'})
        });
    }
  }

  render() {
    const title = this.state.story.id === '' ? 'Add Story': 'Edit Story';
    if (!this.state.story) {
      return null;
    }
    return (
      <div className={classes.EditStory}>
        <h1>{title}</h1>
        <form>
          <FormGroup controlId="title">
            <ControlLabel>Title</ControlLabel>
            <FormControl onChange={(event) => this.handleChange(event, 'title')}
              type="text"
              placeholder="Enter Title"
              value={this.state.story.title}/>
          </FormGroup>
          <FormGroup controlId="description">
            <ControlLabel>Description</ControlLabel>
            <FormControl placeholder="Enter Description" value={this.state.story.description}/>
          </FormGroup>
          <FormGroup controlId="storyStatus">
            <ControlLabel>Story Status</ControlLabel>
            <FormControl componentClass="select" placeholder="Select"
              value={this.state.story.storyStatus}
              onChange={(event) => this.handleChange(event, 'storyStatus')}>
              <option value="0">Backlog</option>
              <option value="1">Planning</option>
              <option value="2">Defined</option>
              <option value="3">In Progress</option>
              <option value="4">Complete</option>
            </FormControl>
          </FormGroup>
        </form>
        <button onClick={this.doSaveHandler}>Save</button>
      </div>
    );
  }
}

const mapStateToProps = state => {
    return {
        story: state.story
    };
};

const mapDispatchToProps = dispatch => {
    return {
          onInitStory: (storyId) => dispatch(actions.initStory(storyId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditStory);
