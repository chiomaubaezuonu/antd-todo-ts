import React, { ChangeEvent, useEffect, useState } from 'react';
import sitter from "../images/sitter.png"
import { Button, Modal } from 'antd';
import MyCalendar from '../components/MyCalendar';
import { todo } from '../Interface';
import DropTask from '../components/DropDown';
import TodoDropdown from '../components/TodoDropdown';


const TodoList = () => {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(true);
    const [isCalendarOpen, setIsCalendarOpen] = useState<boolean>(false);
    const [newTask, setNewTask] = useState<string>("");
    const [taskList, setTaskList] = useState<todo[]>([])
    const [dueDate, setDueDate] = useState<string>("")
    const [isChecked, setIsChecked] = useState<boolean>(false)

    const style = {
        backgroundColor: isChecked ? "gray" : "",
        opacity: isChecked ? "1" : ""
    }

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

    const addTask = (e: ChangeEvent<HTMLInputElement>): void => {
        e.preventDefault()
        setNewTask(e.target.value)
    }
    const saveTodo = () => {
        const myTask = {
            id: taskList.length === 0 ? 1 : taskList.length + 1,
            taskName: newTask,
            dueDate: "",
            isDone: false
        }
        setTaskList([...taskList, myTask])
        setNewTask("")
    }
    // const checked = (id: number) => {
    //     taskList.map((item) => {

    //         return id === item.id ? setTaskList([...taskList, item.isDone: true]) : "";

    //     })
    // }

    const handleDelete = (id: number) => {
        console.log(id)
        const newArr = taskList.filter((item) => {
            return id === item.id ? false : true
        })
        setTaskList(newArr)
    }
    // useEffect(() => {
    //     const data = localStorage.getItem('TODO_LIST')
    //     if(data) {
    // if(data)
    //     }
    // })

    // useEffect(() => {
    //     localStorage.setItem('TODO_LIST', JSON.stringify(taskList))
    // }, [taskList])
    return (
        <div>
            <div className='todoPage-container'>
                <div className='app-title-wrapper'>
                    <img id='sitter' src={sitter} alt='sitter-img' />
                    <h1 className='app-title'>My Todo App</h1>
                </div>
                <div className='todoList'>
                    <h2>Task List</h2>
                    <div className='todo-btns'>
                        <Button type="primary" className='showTask-btn' onClick={showModal}>Show All Tasks</Button>
                        <Button type="primary" className='addTask-btn' onClick={showModal}>
                            + Add a task
                        </Button>
                    </div>
                    <Modal className='modal' title="Add Task" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                        <input type='text' onChange={addTask} value={newTask} placeholder='Enter Task...' />
                        <input type='text' onChange={addTask} value={dueDate} onClick={chooseDate} placeholder='Due date...' />
                        <button onClick={saveTodo}>save</button>
                        {isCalendarOpen && <MyCalendar />}
                    </Modal>
                    {
                        taskList.sort((a, b) => b.id - a.id).map((item) => {
                            return <div>
                                <div className='todo-group'>
                                    <div className='todos' key={item.id}>
                                        {/* <h1>{item.id}</h1> */}
                                        <input
                                            // onChange={() => checked(item.id)}
                                            type='checkbox' />

                                        <p> {item.taskName}</p>
                                    </div>
                                    <div style={{ backgroundColor: "purple" }}>
                                        <TodoDropdown />
                                        <h1></h1>
                                        {/* <p>{item.dueDate}</p>
                                    <div onClick={() => handleDelete(item.id)}>x</div> */}
                                    </div>
                                </div>
                                <hr></hr>
                            </div>
                        })
                    }
                </div>
            </div>

        </div>
    )
}

export default TodoList