import PropTypes from 'prop-types';
import Task from './Task.jsx';
import './TaskList.css';


const TaskList = ({ tasks, ontoggleTaskPresence, ondeleteTask }) => {
  const getTaskListJSX = (tasks) => {
    return tasks.map((task) => {
      return (
        <Task
          key={task.id}
          id={task.id}
          title={task.title}
          isComplete={task.isComplete}
          ontogglePresence={ontoggleTaskPresence}
          ondeleteTask = {ondeleteTask}
        />
      );
    });
  };
  return <ul className="tasks__list no-bullet">{getTaskListJSX(tasks)}</ul>;
};

TaskList.propTypes = {
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      isComplete: PropTypes.bool.isRequired,
    })
  ).isRequired,
  ontoggleTaskPresence: PropTypes.func.isRequired,
  ondeleteTask: PropTypes.func.isRequired
};

export default TaskList;
