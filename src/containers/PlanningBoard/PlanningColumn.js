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

  let getCategoryTotalPoints = () => {
    let totalPoints = props.stories.reduce((total, story) => (
      total + ((story.storySize && story.storySize !== '') ? parseInt(story.storySize) : 0)), 0);
      return props.stories.length === 0 ? 'Empty' : 'Total ' + totalPoints + 'pts';
  };

  return (
    <div className={classes.PlanningColumn}>
      <h1 className={classes.PlanningColumn__Title}>{props.title}</h1>
        <div className={columnClasses.join(' ')}>
          {items}
          <div className={classes.PlanningColumn__TotalPoints}>{getCategoryTotalPoints()}</div>
        </div>
    </div>
  )
};


export default planningColumn;
