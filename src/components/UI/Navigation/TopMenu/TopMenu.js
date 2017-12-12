import React from 'react';
import classes from './TopMenu.css';
import {NavLink} from 'react-router-dom';
const topMenu = (props) => {
  return (
    <nav className={classes.TopMenu}>
      <div className={classes.TopMenu__Title}>Agile Planner</div>
      <ul>
        <li><NavLink to="/planning">Planning Board</NavLink></li>
        <li><NavLink to="/storylist">User Stories</NavLink></li>
        <li><NavLink to="/addstory">Add User Story</NavLink></li>
      </ul>
    </nav>
  );
};

export default topMenu;
