import { useState } from 'react';
import PropTypes from 'prop-types';

const NewTaskForm = ({ onPostTask }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    const newTask = {
      title,
      description,
    };
    onPostTask(newTask);
    setTitle('');
    setDescription('');
  };

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  return (
    <form onSubmit={handleSubmit} className="newTaskForm">
        <div>
          <label htmlFor="title">Title</label>
          <input
            name="title"
            id="title"
            value={title}
            onChange={handleTitleChange}
            type='text'
          />
          <label htmlFor="description">Description</label>
          <input
            name="description"
            id="description"
            value={description}
            type='text'
            onChange={handleDescriptionChange}
          />
          <button>Add Task</button>
        </div>
    </form>
  );
};

NewTaskForm.propTypes = {
  onPostTask: PropTypes.func.isRequired,
};

export default NewTaskForm; 