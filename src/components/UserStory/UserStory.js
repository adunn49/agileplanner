import React, {Component} from 'react';
import classes from './UserStory.css';
import {NavLink} from 'react-router-dom';
import ButtonIcon from '../UI/ButtonIcon/ButtonIcon';

class UserStory extends Component {
  state = {
    showConfirmModal: false
  };


  render() {
    let storySize = 'Unsized';
    if (this.props.story.storySize && this.props.story.storySize !== '') {
      storySize = this.props.story.storySize + 'pts';
    }
    return (
        <div className={classes.UserStory}>
          <div className={classes['UserStory__Header']}>
            <NavLink to={'/editstory/' + this.props.story.id}>
              <ButtonIcon
                title="Edit User Story"
                glyphicon="glyphicon-pencil" />
            </NavLink>
            <ButtonIcon
              title="Delete User Story"
              onClick={() => this.props.onDeleteStory(this.props.story.id)}
              glyphicon="glyphicon-trash" />
          </div>
          <div className={classes['UserStory__Body']}><h1 className={classes.UserStory__Body__Title}>{this.props.story.title}</h1></div>
          <div className={classes.UserStory__Footer}>
            <div className={[classes.Stat1, classes.Color1].join(' ')}>{storySize}</div>
          </div>
        </div>
    );
  }
}

export default UserStory;
