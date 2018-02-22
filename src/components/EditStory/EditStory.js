import React, { Component } from 'react';
import {FormGroup, ControlLabel, FormControl} from 'react-bootstrap';
import { connect } from 'react-redux';

import * as actions from '../../store/actions/story_actions';
import classes from './EditStory.css';

const STORY_STATUS_ENUM = [
  'backlog',
  'planning',
  'defined',
  'progress',
  'complete'
];

class EditStory extends Component {

  /**
   * Called when the user types in an input field.
   */
  handleUserInput = (event, controlId) => {
    let story = {...this.state.story};
    story[controlId] = event.target.value;
    this.setState({
      story: story
    });
  }

  componentDidMount() {
    let {story} = {...this.props};
    this.setState({
      story:  story
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.story) {
      let story = {...nextProps.story};
      this.setState({
        story: story
      });
    }
  }

  render() {
    if (this.state === null) return null;
    return(
      <div className={['panel', 'panel-default', classes.EditStory].join(' ')}>
        <h1>{this.props.title}</h1>
        <form>
          <div className="container-fluid">
            <div className="row">
              <div className="col-sm-12">
                <FormGroup controlId="title">
                  <ControlLabel>Title</ControlLabel>
                  <FormControl onChange={(event) => this.handleUserInput(event, 'title')}
                    type="text"
                    placeholder="Enter Title"
                    autoComplete="off"
                    value={this.state.story.title}/>
                </FormGroup>
              </div>
            </div>
            <div className="row">
              <div className="col-sm-12">
                <FormGroup controlId="description">
                  <ControlLabel>Description</ControlLabel>
                  <FormControl placeholder="Enter Description"
                    onChange={(event) => this.handleUserInput(event, 'description')}
                    autoComplete="off"
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
                    onChange={(event) => this.handleUserInput(event, 'storyStatus')}>
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
                    autoComplete="off"
                     onChange={(event) => this.handleUserInput(event, 'storySize')}
                     value={this.state.story.storySize}/>
                </FormGroup>
              </div>
            </div>
        </div>
        </form>
        <div className="container-fluid">
          <div className="row">
            <div className="col-sm-12 text-right">
              <button className="btn btn-default" onClick={this.props.doCancelHandler} style={{marginRight: '5px'}}>Cancel</button>
              <button className="btn btn-primary" onClick={() => this.props.doSaveHandler(this.state.story)}>Save</button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default EditStory;
