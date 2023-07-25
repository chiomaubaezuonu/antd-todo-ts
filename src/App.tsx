import React, { FC, useState } from 'react'
import HomePage from './HomePage'
import { createContext } from 'react';
import { todo } from './Interface';
import TodoList from './pages/TodoList';
import Tuts from './pages/Tuts';


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
    <TodoList />
    {/* <Tuts /> */}
    </taskContext.Provider>
    </div>
  )
}

export default App