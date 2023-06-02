import React, { ChangeEvent, FC, useEffect, useState } from 'react';
import noTask from './images/noTask-img.png';
import { Button, Calendar, Modal } from 'antd';
import "./App.css"
import MyCalendar from './components/MyCalendar';
import TodoList from "./pages/TodoList";
import { todo } from "./Interface"


const HomePage: FC = () => {
  const [newTask, setNewTask] = useState<string>("")
  const [taskList, setTaskList] = useState<todo[]>([])
  const [todoPage, setTodoPage] = useState<boolean>(false);


  
  // const handleSubmit = (e: ChangeEvent<HTMLFormElement>): void => {
  //   e.preventDefault()
  //   setNewTask(e.target.value)
  //   const myTodo = {
  //     id: taskList.length === 0 ? 1 : taskList.length + 1,
  //     taskName: newTask,
  //     dueDate: "",
  //     isDone: false
  //   }
  //   setTaskList([...taskList, myTodo])
  //   //setTodoPage(true)
  // }

  const addTask = () => {
    console.log(taskList.length)
    setTodoPage(!todoPage)
  }
  
  

  return (
    <div>
      {!todoPage && taskList.length === 0 ? <div className='homePage-wrapper'>
        <img src={noTask} className='home-img' alt='no-task-img' />
        <h1 className='homePage-title'>No task yet!! Please add a task</h1>
        <div>
          <Button className='modal-btn' onClick={addTask} type="primary">
            Add task
          </Button>
        </div>
      </div>
        :
        <TodoList  />
      }
    </div>
  );
}

export default HomePage