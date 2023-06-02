import React, { FC, useState } from 'react'
import HomePage from './HomePage'
import { createContext } from 'react';
import { todo } from './Interface';
import DropTask from './components/DropDown';
import AllTasks from './components/AllTasks';
import TodoDropdown from './components/TodoDropdown';


export type todoType = {
  taskList : todo[],
  setTaskList :  React.Dispatch<React.SetStateAction<todo[]>>
}
export const taskContext = createContext({} as todoType)
const App:FC = () => {
 
  const [taskList, setTaskList] = useState<todo[]>([])
  return (
    <div>
    <taskContext.Provider value={{taskList, setTaskList}}>
    <HomePage />
    <DropTask />
    <AllTasks />
    <TodoDropdown />
    </taskContext.Provider>
    </div>
  )
}

export default App