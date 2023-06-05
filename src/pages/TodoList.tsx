import React, { ChangeEvent, useEffect, useState } from 'react';
import sitter from "../images/sitter.png"
import { Button, Modal } from 'antd';
import { todo } from '../Interface';
import TodoDropdown from '../components/TodoDropdown';
import TodoDatePicker from '../components/TodoDatePicker';
import ProgressBar from '../components/ProgressBar';
import { todoType } from '../App';

type TaskListType = {
    taskList: todo[],
    setTaskList: React.Dispatch<React.SetStateAction<todo[]>>
}
const TodoList = () => {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(true);
    const [isCalendarOpen, setIsCalendarOpen] = useState<boolean>(false);
    const [newTask, setNewTask] = useState<string>("");
    const [taskList, setTaskList] = useState<todo[]>([])
    const [todoDueDate, setTodoDueDate] = useState<boolean>(false)
    const [isChecked, setIsChecked] = useState<boolean>(false)

    const style = {
        backgroundColor: isChecked ? "gray" : "",
        opacity: isChecked ? "1" : ""
    }
    let drop = ">"
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
        setTodoDueDate(!todoDueDate)
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
                        {/* <input type='text' onChange={chooseDate} onClick={chooseDate} placeholder='Due date...' /> */}
                        <TodoDatePicker />
                        <button onClick={saveTodo}>save</button>

                    </Modal>
                    <ProgressBar />
                    {
                        taskList.sort((a, b) => b.id - a.id).map((item) => {
                            return <div key={item.id}>
                                <div className='todo-group'>
                                    <div className='todos'>
                                        {/* <h1>{item.id}</h1> */}
                                        <input
                                            // onChange={() => checked(item.id)}
                                            type='checkbox' />

                                        <p> {item.taskName}</p>
                                    </div>
                                    <div>
                                        <TodoDropdown/>

                                        {/* <h1>{drop}</h1> */}
                                        {/* <p>{item.dueDate}</p>
                                    <div onClick={() => handleDelete(item.id)}>x</div> */}
                                    </div>
                                </div>
                                <hr></hr>
                            </div>
                        })
                    }
                    <Button type='primary' onClick={() => alert("clikcked")}>check</Button>
                </div>
            </div>

        </div>
    )
}

export default TodoList