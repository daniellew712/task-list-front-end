// import { useState } from 'react';
import PropTypes from 'prop-types';

import './Task.css';



const Task = ({id, title, isComplete, ontogglePresence, ondeleteTask}) => {
  const buttonClass = isComplete ? 'tasks__item__toggle--completed' : '';
  return (
    <li className="tasks__item">
      <button
        className={`tasks__item__toggle ${buttonClass}`}
        onClick={() => ontogglePresence(id)}
      >
        {title}
      </button>
      <button className="tasks__item__remove button"
        onClick={() => ondeleteTask(id)}>x</button>
    </li>
  );
};

Task.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  isComplete: PropTypes.bool.isRequired,
  ontogglePresence: PropTypes.func.isRequired,
  ondeleteTask: PropTypes.func.isRequired
};

export default Task;
