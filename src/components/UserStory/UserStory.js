import React, {Component} from 'react';
import classes from './UserStory.css';
import {NavLink} from 'react-router-dom';

class UserStory extends Component {
  render() {
    return (
      <div className={classes.UserStory}>
        <div className={classes['UserStory__Header']}><NavLink to={'/editstory/' + this.props.story.id}><span class="glyphicon glyphicon-pencil"></span></NavLink></div>
        <div className={classes['UserStory__Body']}><h1 className={classes.UserStory__Body__Title}>{this.props.story.title}</h1></div>
        <div className={classes.UserStory__Footer}>
          <div className={[classes.Stat1, classes.Color1].join(' ')}>{this.props.story.planningSize}pts</div>
          <div className={[classes.Stat1, classes.Color2].join(' ')}>2</div>
          <div className={[classes.Stat1, classes.Color3].join(' ')}>78%</div>
        </div>
      </div>
    );
  }
}

export default UserStory;
