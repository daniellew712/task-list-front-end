import TaskList from './components/TaskList.jsx';
import './App.css';
import { useState } from 'react';

const TASKS = [
  {
    id: 1,
    title: 'Mow the lawn',
    isComplete: false,
  },
  {
    id: 2,
    title: 'Cook Pasta',
    isComplete: true,
  },
];


const App = () => {
  const [taskData, setTaskData] = useState(TASKS);
  // const buttonClass = complete ? 'tasks__item__toggle--completed' : '';

  // const toggleTaskPresence = (taskId) => {
  //   const togglePresence = taskData.map(task => {
  //     if (task.id === taskId) {
  //       return { ...task, isComplete: !task.isComplete };
  //     } else {
  //       return task;
  //     }
  //   });

  // setTaskData(togglePresence);
  // };
  const toggleTaskPresence = (TaskId) => {
    setTaskData(taskData => {
      return taskData.map(task => {
        if (task.id === TaskId) {
          return {...task, isComplete: !task.isComplete};
        } else {
          return task;
        }
      });
    });
    setTaskData(setTaskData);
  };


  return (
    <div className="App">
      <header className="App-header">
        <h1>Ada&apos;s Task List</h1>
      </header>
      <main>
        <div>
          <TaskList taskData={taskData} ontoggleTaskPresence = {toggleTaskPresence}/></div>
      </main>
    </div>
  );
};

export default App;
