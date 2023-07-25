import React, { ChangeEvent, useEffect, useState } from 'react';
import sitter from "../images/sitter.png"
import { Button, Checkbox, Col, Input, Modal, Row, Select, Space, Progress, Switch } from 'antd';
//ngimport { todo } from '../Interface';
import { todoType } from '../App';
import noTask from "../images/noTask-img.png";
import '../App.css'
import Title from 'antd/es/typography/Title';
import type { CheckboxChangeEvent } from 'antd/es/checkbox';
import { DownOutlined, SmileOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { checkServerIdentity } from 'tls';

const data = localStorage.getItem('TODO_LIST')

const acquiredData = data ? JSON.parse(data) : []



type Todo = {
    id: number,
    taskName: string,
    dueDate: string,
    isDone: boolean
}
export type propsType = {
    taskList: string,
    setTaskList: React.Dispatch<React.SetStateAction<Todo[]>>
}
const { Option } = Select;

const TodoList = () => {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [isCalendarOpen, setIsCalendarOpen] = useState<boolean>(false);
    const [newTask, setNewTask] = useState<string>("");
    const [taskList, setTaskList] = useState<Todo[]>(acquiredData)
    const [todoDueDate, setTodoDueDate] = useState<boolean>(false)
    const [checkedTask, setCheckedTask] = useState(false);
    const [todoPage, setTodoPage] = useState<boolean>(false);
    const [progress, setProgress] = useState<number>(0)
    const [countChecked, setCountChecked] = useState<number>(0)

    // const style = {
    //     backgroundColor: myChecked ? "gray" : "",
    //     opacity: myChecked ? "1" : ""
    // }
    const addTask1 = () => {
        setTodoPage(true)
        setIsModalOpen(true)
    }
    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        if (newTask === "") {
            return ""
        }
        const myTask = {
            id: taskList.length === 0 ? 1 : taskList.length + 1,
            taskName: newTask,
            dueDate: "",
            isDone: false
        }
        setTaskList([...taskList, myTask])
        setNewTask("")
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    // const chooseDate = () => {
    //     setTodoDueDate(!todoDueDate)
    // }
    // Checkbox


    const addTask = (e: ChangeEvent<HTMLInputElement>): void => {
        e.preventDefault()
        setNewTask(e.target.value)
    }

    // const handleDelete = (id: number) => {
    //     console.log(id)
    //     const newArr = taskList.filter((item) => {
    //         return id === item.id ? false : true
    //     })
    //     setTaskList(newArr)
    // }

    useEffect(() => {
        localStorage.setItem('TODO_LIST', JSON.stringify(taskList))
    }, [taskList])


    return (
        <Row>
            {!todoPage && taskList.length === 0 ?
                <Col span={24} className='noTask-wrapper'>
                    <img src={noTask} className='home-img' alt='no-task-img' />
                    <Title className='homePage-title'>No task yet!! Please add a task</Title>
                    <Col>
                        <Button className='modal-btn' onClick={addTask1} type="primary">
                            Add task
                        </Button>
                    </Col>
                </Col>
                :
                <Col span={24} className='todoPage-container'>
                    <Col className='app-title-wrapper'>
                        <img id='sitter' src={sitter} alt='sitter-img' />
                        <h1 className='app-title'>My Todo App</h1>
                    </Col>
                    <Col className='todoList'>
                        <Col className='progressBar'>
                            <Title level={2} id='taskList-title'>Task List</Title>
                            <Col>
                                {/* <Col style={{ color: "gray" }}>  Task completed {countChecked + "/" + taskList.length}</Col> */}
                                <div style={{ width: 170 }}>
                                    <Progress percent={progress} size="small" />
                                </div></Col>
                        </Col>
                        <Col className='todo-btns'>
                            <Select
                                // value={completedTask}
                                style={{ width: 150 }}
                                // onChange={handleChange}
                                defaultValue="ShowTasks"
                            >

                                <Option key="completedTasks" value="completedTasks"> Completed Tasks</Option>
                                <Option value="pendingTasks"> Pending Tasks</Option>
                                <Option value="overdueTasks"> Overdue Tasks</Option>
                            </Select>
                            <Button type="primary" className='addTask-btn' onClick={showModal}>
                                + Add a task
                            </Button>
                        </Col>
                        <Modal className='modal' title="Add Task" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                            <Input type='text' onChange={addTask} value={newTask} placeholder='Enter Task...' />
                            {/* <input type='text' onChange={chooseDate} onClick={chooseDate} placeholder='Due date...' /> */}

                        </Modal>
                        {
                            taskList.sort((a, b) => b.id - a.id).map((item) => {
                                return <Col>
                                    <Col className='todo-group'>
                                        <Col className='todos' key={item.id}>
                                            <Switch checked={item.isDone}
                                                onChange={(newCheckedTask: boolean) => {
                                                    const newList: any = taskList.map(task => {
                                                        if (task.taskName === item.taskName) {
                                                            //console.log(newCheckedTask)
                                                            return {
                                                                ...task,
                                                                isDone: newCheckedTask
                                                            }
                                                        }
                                                        else {
                                                            return task
                                                        }
                                                    })
                                            setTaskList(newList)
                                                }
                                                }
                                            />
                                            <Col> {item.taskName}</Col>
                                        </Col>
                                        <Select style={{ width: "100px" }} bordered={false}>
                                            <Option key="completedTasks" value="completedTasks">Due Date</Option>
                                            <Option value="pendingTasks">Delete</Option>
                                        </Select>
                                        <p>{countChecked}</p>
                                    </Col>
                                    <hr />

                                </Col>
                            })
                        }

                    </Col>
                </Col>
            }
        </Row>
    )
}

export default TodoList