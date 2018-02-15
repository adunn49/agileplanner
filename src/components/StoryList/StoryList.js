import React from 'react';
import {NavLink} from 'react-router-dom';

const StoryList = (props) => {

  let items = props.stories.map(story => {
    return (<tr key={story._id}>
        <td>{story.title}</td>
        <td>{story.storyStatus}</td>
        <td>{story.owner}</td>
        <td>
          <NavLink to={'/editstory/' + story._id}>
            <button className={'btn btn-sm btn-default'}>Edit</button>
          </NavLink>
          <button className={'btn btn-sm btn-default'} onClick={() => props.onDeleteHandler(story._id)}>Delete</button>
          <button className={'btn btn-sm btn-default'}>View Tasks</button>
        </td>
      </tr>
    );
  });

  return (
    <table className={['table', 'table-striped'].join(' ')}>
      <thead>
        <tr>
          <th>User Story</th>
          <th>Status</th>
          <th>Owner</th>
          <th></th>          
        </tr>
      </thead>
      <tbody>
        {items}
      </tbody>
    </table>
  );
}

export default StoryList;
