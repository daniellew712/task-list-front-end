import TaskList from './components/TaskList.jsx';
import './App.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import NewTaskForm from './components/NewTaskForm.jsx';

const kBaseUrl = 'http://127.0.0.1:5000';
// create API to call post task API
const postTaskApi = (newTaskData)=> {
  return axios.post(`${kBaseUrl}/tasks`,newTaskData)
  .then(response => {
    const task = response.data.task;
    return {
        id: task.id,
        title: task.title,
        description: task.description,
        isComplete: task.is_complete,
    };
  })
  .catch(error=>{
    console.log(error);
  });
};

// GET all tasks
const getAllTasksApi = () => {
  return axios
    .get(`${kBaseUrl}/tasks`)
    .then((response) => {
      return response.data.map(task => ({
        id: task.id,
        title: task.title,
        description: task.description,
        isComplete: task.is_complete
      }));
    })
    .catch((error) => {
      console.log(error);
    });
};

const deleteTaskApi = (id) => {
  return axios.delete(`${kBaseUrl}/tasks/${id}`).catch((error) => {
    console.log(error);
  });
};
const toggleTaskPresenceApi = (id, isComplete) => {
  const endpoint = isComplete ? 'mark_complete' : 'mark_incomplete';
  return axios.patch(`${kBaseUrl}/tasks/${id}/${endpoint}`).catch((error) => {
    console.log(error);
  });
};

const App = () => {
  const [taskData, setTaskData] = useState([]);
  const getAllTasks = () => {
    return getAllTasksApi().then((tasks) => setTaskData(tasks));
  };
  useEffect(() => {
    getAllTasks();
  }, []);

  const toggleTaskPresence = (id) => {
    const task = taskData.find(task => task.id === id);
    return toggleTaskPresenceApi(id, !task.isComplete)
      .then(() => {
        setTaskData(currentTaskData => currentTaskData.map(task => {
          if (task.id === id) {
            return {...task, isComplete: !task.isComplete};
          } else {
            return task;
          }
        }));
      });
  };

  const deleteTask = (id) => {
    return deleteTaskApi(id).then(() => {
      setTaskData((taskData) => {
        return taskData.filter((task) => task.id != id);
      });
    });
  };
  const postTask =(newTaskData)=>{
    postTaskApi(newTaskData)
    .then(newTask=>{
      setTaskData(prevTasks => [newTask,...prevTasks]);
    });
  };
  return (
    <div className="App">
      <header className="App-header">
        <h1>Ada&apos;s Task List</h1>
      </header>
      <main>
        <div>
          <TaskList
            tasks={taskData}
            ontoggleTaskPresence={toggleTaskPresence}
            ondeleteTask={deleteTask}
          />
          <NewTaskForm addTaskCallback ={postTask}/>
        </div>
      </main>
    </div>
  );
};

export default App;
