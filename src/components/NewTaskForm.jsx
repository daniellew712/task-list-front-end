import { useState } from 'react';
import PropTypes from 'prop-types';


const NewTaskForm = ({ addTaskCallback }) => {
  const [titleData, setTitleData] = useState('');
  const [descriptionData, setDescriptionData] = useState('');
  const handleSubmit = (event) => {
    event.preventDefault();
    const newTask = {
        title: titleData,
        description: descriptionData,
};

    addTaskCallback(newTask);
    setTitleData('');
    setDescriptionData('');
  };

  const handleChange = (event) => {
    setDescriptionData(event.target.value);
  };

  return (
    <form onSubmit={handleSubmit}>
    <div>
        <label htmlFor="input-title">Title:</label>
        <input
          type="text"
          id="input-title"
          name="title"
          value={titleData}
          onChange={(e) => setTitleData(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor='input-description'>Description:</label>
        <input
          onChange={handleChange}
          type='text'
          id='input-description'
          name='description'
          value={descriptionData}
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
