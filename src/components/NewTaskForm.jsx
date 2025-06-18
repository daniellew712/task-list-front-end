import { useState } from 'react';
import PropTypes from 'prop-types';

const newTask = {
    id :'',
    title: '',
    isComplete : '',
};

const NewTaskForm = ({ addTaskCallback }) => {
  const [titleData, setTitleData] = useState(newTask.title);

  const handleSubmit = (event) => {
    event.preventDefault();
    addTaskCallback({ title: titleData });
    setTitleData('');
  };

  const handleChange = (event) => {
    setTitleData(event.target.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor='input-title'>:</label>
        <input
          onChange={handleChange}
          type='text'
          id='input-title'
          name='title'
          value={titleData}
        />
      </div>
      <div>
        <button className="form-button">Add Task</button>
      </div>
    </form>
  );
};

NewTaskForm.propTypes = {
  addTaskCallback: PropTypes.func.isRequired,
};

export default NewTaskForm;
