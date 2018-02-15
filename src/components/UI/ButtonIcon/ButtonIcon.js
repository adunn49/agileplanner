import React from 'react';
import classes from './ButtonIcon.css';

const buttonIcon = (props) => {
  return (
    <span
      title={props.title}
      onClick={props.onClick}
      className={['glyphicon', classes.glyphicon, props.glyphicon, classes[props.glyphicon]].join(' ')}>
    </span>
  )};

export default buttonIcon;
