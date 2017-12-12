import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actionTypes from '../../store/actions';
import UserStory from '../../components/UserStory/UserStory';
import classes from './PlanningBoard.css';
import PlanningColumn from './PlanningColumn';
import * as actions from '../../store/actions';


/**
 * A Container component for displaying the Planning Board view.
 */
export class PlanningBoard extends Component {

  state = {
    stati: [
      'Backlog',
      'In Planning',
      'Defined',
      'In Progress',
      'Complete'
    ]
  };

  componentDidMount() {
    this.props.onInitStories();
  }

  render () {
    let items = [];
    for (let index = 0; index < this.state.stati.length; index++) {
      let filteredStories = this.props.stories.filter(story =>
        parseInt(story.storyStatus) === index
      );
      items.push(<PlanningColumn planningStatus={this.state.stati[index]} title={this.state.stati[index]} stories={filteredStories} />);
    }
    return (
      <div className={classes.PlanningBoard} >
        {items}
      </div>
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
          onInitStories: () => dispatch(actions.initStories())
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(PlanningBoard);
