import React from 'react';
import classes from './PlanningBoard.css';
import UserStory from '../../components/UserStory/UserStory';
import {NavLink} from 'react-router-dom';

const planningColumn = (props) => {
  let columnClasses = [classes.PlanningColumn__Content];
  if (props.planningStatus === 'backlog') {
    columnClasses.push(classes['PlanningColumn__Content--Highlight1']);
  }


  let getCategoryTotalPoints = () => {
    let totalPoints = props.stories.reduce((total, story) => (
      total + ((story.storySize && story.storySize !== '') ? parseInt(story.storySize, 10) : 0)), 0);
      return props.stories.length === 0 ? 'Empty' : 'Total ' + totalPoints + 'pts';
  };

  let addIcon = (props.planningStatus === 'backlog') ? (
    <div className={classes.BacklogAdd}>
      <NavLink to="/addstory"><span className={['glyphicon', 'glyphicon-plus-sign'].join(' ')}></span></NavLink>
    </div>) : null;

  return (
    <div className={classes.PlanningColumn}>
      <h1 className={classes.PlanningColumn__Title}>{props.title}</h1>
      <div className={columnClasses.join(' ')}>
        {props.stories.map(story => {
          return <UserStory onDeleteStory={storyId => props.onDelete(storyId)} key={story.id} story={story} />
        })}
        <div className={classes.PlanningColumn__TotalPoints}>{getCategoryTotalPoints()}</div>
        {addIcon}
      </div>
    </div>
  )
};


export default planningColumn;
