import React, { Component } from 'react';
import {FormGroup, ControlLabel, FormControl} from 'react-bootstrap';
import { connect } from 'react-redux';

import * as actions from '../../store/actions/story_actions';
import classes from './EditStory.css';
import axios from '../../axios-stories';

const STORY_STATUS_ENUM = [
  'backlog',
  'planning',
  'defined',
  'progress',
  'complete'
];

/**
 * A Component for adding or editing a new user story.
 */
class EditStory extends Component {

  state = {
    /* This will be used for a new user story. */
    story: {
      title: '',
      description: '',
      storyStatus: STORY_STATUS_ENUM[0],
      storySize: null
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
      axios.patch('/stories/' + story._id, {...this.state.story})
        .then(response => {
          this.props.history.goBack();
        });
    } else {
      axios.post('/stories', {...this.state.story})
        .then(response => {
          this.props.history.goBack();
        });
    }
  }

  render() {
    console.log('story', this.state.story);
    const title = this.state.story._id === undefined ? 'Add Story': 'Edit Story';
    if (!this.state.story) {
      return null;
    }
    return (
      <div className={classes.EditStory}>
        <h1>{title}</h1>
        <form>
          <div className="container-fluid">
            <div className="row">
              <div className="col-sm-12">
                <FormGroup controlId="title">
                  <ControlLabel>Title</ControlLabel>
                  <FormControl onChange={(event) => this.handleChange(event, 'title')}
                    type="text"
                    placeholder="Enter Title"
                    value={this.state.story.title}/>
                </FormGroup>
              </div>
            </div>
            <div className="row">
              <div className="col-sm-12">
                <FormGroup controlId="description">
                  <ControlLabel>Description</ControlLabel>
                  <FormControl placeholder="Enter Description"
                    onChange={(event) => this.handleChange(event, 'description')}
                    value={this.state.story.description}/>
                </FormGroup>
              </div>
            </div>
            <div className="row">
              <div className="col-sm-6">
                <FormGroup controlId="storyStatus">
                  <ControlLabel>Story Status</ControlLabel>
                  <FormControl componentClass="select" placeholder="Select"
                    value={this.state.story.storyStatus}
                    onChange={(event) => this.handleChange(event, 'storyStatus')}>
                    {STORY_STATUS_ENUM.map((status) => {
                      return (<option value={status}>{status}</option>);
                    })}
                  </FormControl>
                </FormGroup>
              </div>
              <div className="col-sm-6">
                <FormGroup controlId="storySize">
                  <ControlLabel>Story Size</ControlLabel>
                  <FormControl placeholder="Enter points estimate"
                     onChange={(event) => this.handleChange(event, 'storySize')}
                     value={this.state.story.storySize}/>
                </FormGroup>
              </div>
            </div>
        </div>
        </form>
        <div className="container-fluid">
          <div className="row">
            <div className="col-sm-12">
              <button onClick={this.doSaveHandler}>Save</button>
            </div>
          </div>
        </div>
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
