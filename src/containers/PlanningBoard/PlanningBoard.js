import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import classes from './PlanningBoard.css';
import PlanningColumn from './PlanningColumn';
import * as actions from '../../store/actions/story_actions';
import Aux from '../../hoc/Aux/Auxillary';
import Modal from '../../components/UI/Modal/Modal';


/**
 * A Container component for displaying the Planning Board view.
 */
export class PlanningBoard extends Component {

  state = {
    stati: [
      'backlog',
      'planning',
      'defined',
      'progress',
      'complete'
    ],
    showDeleteConfirm: false
  };

  componentDidMount() {
    if (this.props.isAuthenticated) {
      this.props.onInitStories();
    }
  }

  render () {
    if (!this.props.isAuthenticated) {
      return (<Redirect to='/login'></Redirect>);
    }

    let items = [];
    for (let index = 0; index < this.state.stati.length; index++) {
      let filteredStories = this.props.stories.filter(story => {
          console.log(story.storyStatus);
          return story.storyStatus === this.state.stati[index];
        }
      );
      items.push(<PlanningColumn
          onDelete={storyId => this.props.onDeleteStory(storyId)}
          planningStatus={this.state.stati[index]}
          title={this.state.stati[index]}
          stories={filteredStories} />);
    }
    return (
      <Aux>
        <h1>Planning Board</h1>
        <div className={classes.PlanningBoard} >
          {items}
        </div>
        <Modal show={this.state.showDeleteConfirm} modalClosed={this.purchaseCancelHandler}>
            Delete?
        </Modal>
      </Aux>
    );
  }
}

const mapStateToProps = state => {
    return {
        stories: state.stories.stories,
        isAuthenticated: state.authentication.token !== null
    };
};

const mapDispatchToProps = dispatch => {
    return {
          onInitStories: () => dispatch(actions.initStories()),
          onDeleteStory: (storyId) => dispatch(actions.initDeleteStory(storyId))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(PlanningBoard);
