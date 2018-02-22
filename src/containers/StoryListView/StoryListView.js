import React, { Component } from 'react';
import { connect } from 'react-redux';
import {NavLink} from 'react-router-dom';

import Aux from '../../hoc/Aux/Auxillary';
import * as actions from '../../store/actions/story_actions';
import StoryList from '../../components/StoryList/StoryList';

class StoryListView extends Component {

  componentDidMount() {
    this.props.onInitStories();
  }

  render() {
    if (!this.props.stories) {
      return null;
    }
    return (
      <Aux>
        <h1>Story List</h1>
        <StoryList stories={this.props.stories}
          onDeleteHandler={(storyId) => this.props.onDeleteHandler(storyId)}>
        </StoryList>
        <div className="text-center">
          <NavLink to="/addstory">
            <button className={'btn btn-primary'}>Add Story</button>
          </NavLink>
        </div>
      </Aux>
    );
  }
}

const mapStateToProps = state => {
    return {
        stories: state.stories
    };
};

const mapDispatchToProps = dispatch => {
    return {
          onInitStories: () => dispatch(actions.initStories()),
          onDeleteHandler: (storyId) => dispatch(actions.initDeleteStory(storyId))
    };
};

export default connect (mapStateToProps, mapDispatchToProps)(StoryListView);
