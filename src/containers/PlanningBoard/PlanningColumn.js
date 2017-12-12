import React from 'react';
import classes from './PlanningBoard.css';
import UserStory from '../../components/UserStory/UserStory';

const planningColumn = (props) => {
  const items = props.stories.map(story => {
    return <UserStory key={story.id} story={story} />
  });
  let columnClasses = [classes.PlanningColumn__Content];
  console.log('Planning Status',props.planningStatus);
  if (props.planningStatus === 'Backlog') {
    columnClasses.push(classes['PlanningColumn__Content--Highlight1']);
  }
  console.log(columnClasses);
  return (
    <div className={classes.PlanningColumn}>
      <h1 className={classes.PlanningColumn__Title}>{props.title}</h1>
        <div className={columnClasses.join(' ')}>
          {items}
        </div>
    </div>
  )
};

export default planningColumn;
