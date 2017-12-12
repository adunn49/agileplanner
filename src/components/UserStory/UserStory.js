import React, {Component} from 'react';
import classes from './UserStory.css';
import {NavLink} from 'react-router-dom';

class UserStory extends Component {
  render() {
    let storySize = 'Unsized';
    if (this.props.story.storySize && this.props.story.storySize !== '') {
      storySize = this.props.story.storySize + 'pts';
    }
    return (
      <div className={classes.UserStory}>
        <div className={classes['UserStory__Header']}><NavLink to={'/editstory/' + this.props.story.id}><span class="glyphicon glyphicon-pencil"></span></NavLink></div>
        <div className={classes['UserStory__Body']}><h1 className={classes.UserStory__Body__Title}>{this.props.story.title}</h1></div>
        <div className={classes.UserStory__Footer}>
          <div className={[classes.Stat1, classes.Color1].join(' ')}>{storySize}</div>
        </div>
      </div>
    );
  }
}

export default UserStory;
