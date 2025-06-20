import TaskList from './components/TaskList.jsx';
import './App.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import NewTaskForm from './components/NewTaskForm';

const kBaseUrl = 'http://127.0.0.1:5000'

const getAllTasksApi = () => {
  return axios.get(`${kBaseUrl}/tasks`)
    .then((response) => {
      return response.data.map(convertFromApi);
    })
    .catch((error) => {
      console.log("error:", error);
    });
};

const convertFromApi = (apiTask) => {
  const { id, title, description, completed_at, is_complete } = apiTask;
  const newTask = { id, title, description, completed_at, isComplete: is_complete };
  return newTask;
};

const toggleTaskPresenceApi = (id, isComplete) => {
  const path = isComplete ? 'mark_incomplete' : 'mark_complete';
  return axios.patch(`${kBaseUrl}/tasks/${id}/${path}`)
    .then(response => {
      return convertFromApi(response.data.task);
      })
    .catch(error => {
      console.log("error:", error);
      return null;
    });
};

const deleteTaskApi = (id) => {
  return axios.delete(`${kBaseUrl}/tasks/${id}`)
    .catch(error => {
      console.log("error:", error);
    });
};

const postTaskApi = (task) => {
  return axios.post(`${kBaseUrl}/tasks`, {
    title: task.title,
    description: task.description,
  })
  .then((response) => {
    return convertFromApi(response.data.task);
  })
  .catch((error) => {
    console.log("error:", error);
  });
};



// const TASKS = [
//   {
//     id: 1,
//     title: 'Mow the lawn',
//     isComplete: false,
//   },
//   {
//     id: 2,
//     title: 'Cook Pasta',
//     isComplete: true,
//   },
// ];


const App = () => {
  const [taskData, setTaskData] = useState([]);

  const getAllTasks = () => {
    return getAllTasksApi()
      .then(tasks => setTaskData(tasks));
  };

  useEffect(() => {
    getAllTasks();
  }, []);

  const toggleTaskPresence = (id) => {
    const task = taskData.find(task => task.id === id);
    if (!task) return;

    return toggleTaskPresenceApi(id, task.isComplete)
      .then(taskStatus => {
        setTaskData(taskData => taskData.map(task => {
          if (task.id === taskStatus.id) {
            return taskStatus;
          } else {
            return task;
          }
        }));
      });
  };

  const deleteTask = (id) =>{
    return deleteTaskApi(id)
    .then(() => {
      setTaskData(taskData => taskData.filter(task => {
        return task.id !== id;
      }));
    });
  };
  const postTask = (task) => {
    return postTaskApi(task)
      .then((newTask) => {
        setTaskData((prevTasks) => [...prevTasks, newTask]);
      });
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Ada&apos;s Task List</h1>
      </header>
      <main>
        <div>
          <TaskList tasks={taskData} ontoggleTaskPresence = {toggleTaskPresence} ondeleteTask = {deleteTask}/></div>
        <NewTaskForm onPostTask={postTask} />
      </main>
    </div>
  );
};

export default App;
