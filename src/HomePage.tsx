import React, { ChangeEvent, FC, useEffect, useState } from 'react';
import noTask from './images/noTask-img.png';
import { Button, Calendar, Modal } from 'antd';
import "./App.css"
import MyCalendar from './components/MyCalendar';
import TodoList from "./pages/TodoList";
import { todo } from "./Interface"


const HomePage: FC = () => {
  const [newTask, setNewTask] = useState<string>("")
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isCalendarOpen, setIsCalendarOpen] = useState<boolean>(false);
  const [taskList, setTaskList] = useState<todo[]>([])
  const [todoPage, setTodoPage] = useState<boolean>(false);

  // const style = {
  //   backgroundColor: isChecked ? "gray" : "",
  //   opacity: isChecked ? "1" : ""
  // }
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const chooseDate = () => {
    setIsCalendarOpen(true)
  }
  const handleSubmit = (e: ChangeEvent<HTMLFormElement>): void => {
    e.preventDefault()
    setNewTask(e.target.value)
    const myTodo = {
      id: taskList.length === 0 ? 1 : taskList.length + 1,
      taskName: newTask,
      dueDate: "",
      isDone: false
    }
    setTaskList([...taskList, myTodo])
    //setTodoPage(true)
  }
  // const saveTodo = () => {
  // const myTodo = {
  //   id: taskList.length === 0 ? 1 : taskList.length + 1,
  //   taskName: newTask,
  //   dueDate: "",
  //   isDone: false
  // }
  // setTaskList([...taskList, myTodo])
  //}
  const handleDelete = (id: number) => {
    const newArr = taskList.filter((item) => {
      return id === item.id ? false : true
    })
    setTaskList(newArr)
  }
  useEffect(() => {
    const data = localStorage.getItem('TODO_LIST')
    if (data) {
      const acquiredData = JSON.parse(data)
      setTaskList(acquiredData)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('TODO_LIST', JSON.stringify(taskList))
  }, [taskList])

  return (
    <div>
      {taskList.length === 0 ? <div className='homePage-wrapper'>
        <img src={noTask} className='home-img' alt='no-task-img' />
        <h1 className='homePage-title'>No task yet!! Please add a task</h1>
        <div>
          <Button className='modal-btn' type="primary"
           onClick={showModal}
           >
            Add task
          </Button>
        </div>
        <Modal className='modal' title="Add Task" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
          <form onSubmit={handleSubmit}>
            <input onChange={(e) => setNewTask(e.target.value)} value={newTask} type='text' placeholder='Enter Task...' />
            <input onChange={(e) => setNewTask(e.target.value)} type='text' onClick={chooseDate} placeholder='Deadline...' />
            <button style={{ padding: "0.3rem 0.6rem", marginLeft: "0.5rem" }} type='submit'>+ Add</button>
          </form>
          {isCalendarOpen && <MyCalendar />}
        </Modal>

      </div>
        :
        <TodoList  />
        // <div>
        //   {
        //     taskList.map((item) => {
        //       return <div>
        //         <div className='todos'>
        //           {/* <h1>{item.id}</h1> */}
        //           <h1 key={item.id}>{item.taskName}</h1>
        //           <input
        //             // onChange={() => checked(item.id)}
        //             type='checkbox' />
        //           <h1 onClick={() => handleDelete(item.id)}>x</h1>
        //         </div>
        //       </div>
        //     })
        //   }
        // </div>

      }
    </div>
  );
}

export default HomePage