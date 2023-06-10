import React, { FC, useState } from 'react'
import HomePage from './HomePage'
import { createContext } from 'react';
import { todo } from './Interface';
import AllTasks from './components/AllTasks';
import TodoDropdown from './components/TodoDropdown';
// import TaskDropDown from './components/TaskDropDown';
import { BtnType } from './components/Btn';
import TodoList from './pages/TodoList';


export type todoType = {
  taskList : todo[],
  setTaskList :  React.Dispatch<React.SetStateAction<todo[]>>
}
export const taskContext = createContext({} as todoType)
const App = () => {
 
  const [taskList, setTaskList] = useState<todo[]>([])
  return (
    <div>
    <taskContext.Provider value={{taskList, setTaskList}}>
    <HomePage />
    <AllTasks />
    {/* <TaskDropDown /> */}
    <TodoList />
    <TodoDropdown/>
    </taskContext.Provider>
    </div>
  )
}

export default App