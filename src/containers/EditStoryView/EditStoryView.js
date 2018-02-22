import React, { Component } from 'react';
import {FormGroup, ControlLabel, FormControl} from 'react-bootstrap';
import { connect } from 'react-redux';

import * as actions from '../../store/actions/story_actions';
import EditStory from './../../components/EditStory/EditStory';

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
class EditStoryView extends Component {
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
   * Handles editing mode and loads an existing story if required.
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
   * Called when the user clicks the save button. This commits the new user story
   * to the server and returns to the planning page.
   */
  doSaveHandler = (story) => {
    if (this.state.isEditing) {
      this.props.saveEditedStory({...story})
        .then(() => this.props.history.goBack());
    } else {
      this.props.saveNewStory({...story})
        .then(() => this.props.history.goBack());
    }
  }

  doCancelHandler = () => {
    this.props.history.goBack();
  }


  render() {
    console.log('story', this.props.story);
    if (!this.props.story) {
      return null;
    }
    const title = this.props.story._id === undefined ? 'Add Story': 'Edit Story';
    console.log('STORY', this.props);
    return (
      <EditStory
        title={title}
        story={this.props.story}
        doSaveHandler={this.doSaveHandler}
        doCancelHandler={this.doCancelHandler}>
      </EditStory>
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
          onInitStory: (storyId) => dispatch(actions.initStory(storyId)),
          saveEditedStory: (story) => dispatch(actions.saveEditedStory(story)),
          saveNewStory: (story) => dispatch(actions.saveNewStory(story, ''))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditStoryView);
