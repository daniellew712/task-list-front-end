import { useState } from 'react';
import PropTypes from 'prop-types';
import './NewTaskForm.css';

// create function for new task form
const NewTaskForm = ({ onPostTask }) => {
  // current state value is titleData, setTitleData is the function to update state
  // useState is a hook to remember vlaues between renders

  const [titleData, setTitleData] = useState('');
  const [descriptionData, setDescriptionData] = useState('');
  const handleSubmit = (event) => {
    event.preventDefault();
    const newTask = {
      title: titleData,
      description: descriptionData,
    };
    // notify the application about the data
    onPostTask(newTask);
    // reset the state
    setTitleData('');
    setDescriptionData('');
  };

  const handleTitle = (event) => {
    setTitleData(event.target.value);
  };
  const handleDescription = (event) => {
    setDescriptionData(event.target.value);
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className='input-group'>
        <label htmlFor="input-title">Title:</label>
        <input
          onChange={handleTitle}
          type="text"
          // The id is used to uniquely identify this specific input field in the HTML.
          id="input-title"
          name="title"
          // binds input field with react state
          value={titleData}
          // onChange={(e) => setTitleData(e.target.value)}
        />
        <label htmlFor='input-description'>Description:</label>
        <input
          onChange={handleDescription}
          type='text'
          id='input-description'
          name='description'
          value={descriptionData}
        />
        <button className="form-button">Add Task</button>
      </div>
    </form>
  );
};

NewTaskForm.propTypes = {
  onPostTask: PropTypes.func.isRequired,
};

export default NewTaskForm;


