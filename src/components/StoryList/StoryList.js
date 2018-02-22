import React from 'react';
import {NavLink} from 'react-router-dom';

import ButtonIcon from './../UI/ButtonIcon/ButtonIcon';
import classes from './StoryList.css';

const StoryList = (props) => {

  let rows = props.stories.map(story => {
    return (<tr key={story._id}>
        <td>{story.title}</td>
        <td><span className={classes.storyStatus}>{story.storyStatus}</span></td>
        <td>{story.owner}</td>
        <td>
          <NavLink to={'/editstory/' + story._id}>
            <ButtonIcon
              title="Edit Story"
              glyphicon={['glyphicon-pencil', classes['glyphicon--list']].join(' ')} />
          </NavLink>
          <ButtonIcon
            title="View Story Tasks"
            glyphicon={['glyphicon-th-list', classes['glyphicon--list']].join(' ')}/>
            <ButtonIcon
              title="Delete Story"
              glyphicon={['glyphicon-trash', classes['glyphicon--list']].join(' ')}
              onClick={() => props.onDeleteHandler(story._id)}/>
        </td>
      </tr>
    );
  });

  if (rows.length === 0) {
    rows = (<tr><td colspan="4" className="text-center">User Stories that you add will appear in this list.</td></tr>);
  }

  return (
    <table className={['table', 'table-striped', classes['table-hover']].join(' ')}>
      <thead>
        <tr>
          <th>User Story</th>
          <th>Status</th>
          <th>Owner</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {rows}
      </tbody>
    </table>
  );
}

export default StoryList;
