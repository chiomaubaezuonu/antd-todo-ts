import React, { ChangeEvent, useEffect, useState } from 'react';
import sitter from "../images/sitter.png"
import { Button, Checkbox, Col, Input, Modal, Row, Dropdown, Space, Progress } from 'antd';
import { todo } from '../Interface';
import { todoType } from '../App';
import noTask from "../images/noTask-img.png";
import '../App.css'
import Title from 'antd/es/typography/Title';
import type { CheckboxChangeEvent } from 'antd/es/checkbox';
import { DownOutlined, SmileOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';

const data = localStorage.getItem('TODO_LIST')

const acquiredData = data ? JSON.parse(data) : []



type TaskListType = {
    taskList: todo[],
    setTaskList: React.Dispatch<React.SetStateAction<todo[]>>
}
// const items: MenuProps['items'] = [
//     {
//         key: '1',
//         label: (
//             <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
//                 1st menu item
//             </a>
//         ),
//     },
//     {
//         key: '2',
//         label: (
//             <a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">
//                 2nd menu item (disabled)
//             </a>
//         ),
//         icon: <SmileOutlined />,
//         disabled: false,
//     },
//     {
//         key: '3',
//         label: (
//             <a target="_blank" rel="noopener noreferrer" href="https://www.luohanacademy.com">
//                 3rd menu item (disabled)
//             </a>
//         ),
//         disabled: true,
//     },
//     {
//         key: '4',
//         danger: true,
//         label: 'a danger item',
//     },
// ];

const TodoList = () => {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [isCalendarOpen, setIsCalendarOpen] = useState<boolean>(false);
    const [newTask, setNewTask] = useState<string>("");
    const [taskList, setTaskList] = useState<todo[]>(acquiredData)
    const [todoDueDate, setTodoDueDate] = useState<boolean>(false)
    const [isChecked, setIsChecked] = useState<boolean>(false)
    const [todoPage, setTodoPage] = useState<boolean>(false);


    const items: MenuProps['items'] = [
        {
            key: '1',
            label: (
                <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
                    Due Date
                </a>
            ),
        },
        {
            key: '2',
            danger: true,
            label: 'delete',
        },
    ]
    const items2: MenuProps['items'] = [
        {
            key: '3',
            label: (
                <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
                    Overdue Tasks
                </a>
            ),
        },
        {
            key: '4',
            //danger: true,
            label: 'Pending tasks',
        },
    ]

    const style = {
        backgroundColor: isChecked ? "gray" : "",
        opacity: isChecked ? "1" : ""
    }
    // let drop = ">"
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
    const chooseDate = () => {
        setTodoDueDate(!todoDueDate)
    }
    // Checkbox
    const [checked, setChecked] = useState(true);

    const onChange = (e: CheckboxChangeEvent) => {
        console.log('checked = ', e.target.checked);
        setChecked(e.target.checked);
    };


    const addTask = (e: ChangeEvent<HTMLInputElement>): void => {
        e.preventDefault()
        setNewTask(e.target.value)
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
                            <div style={{ width: 170 }}>
                                <Progress percent={30} size="small" />
                            </div>
                        </Col>
                        <Col className='todo-btns'>
                            <Button type="primary"
                                className='addTask-btn'>
                                Show Tasks
                                <Dropdown menu={{ items }}>
                                    <a onClick={(e) => e.preventDefault()}>
                                        <Space>
                                            <DownOutlined />
                                        </Space>
                                    </a>
                                </Dropdown>
                            </Button>
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
                                return <Col key={item.id}>
                                    <Col className='todo-group'>
                                        <Col className='todos'>
                                            {/* <input
                                                // onChange={() => checked(item.id)}
                                                type='checkbox' /> */}
                                            <p style={{ marginBottom: '20px', marginRight: '1rem' }}>
                                                {/* <Checkbox checked={checked} disabled={disabled} onChange={onChange}>
                                                    {label}
                                                </Checkbox> */}
                                                <Checkbox onChange={onChange}></Checkbox>

                                            </p>
                                            <p> {item.taskName}</p>
                                        </Col>
                                        <Dropdown menu={{ items }}>
                                            <a onClick={(e) => e.preventDefault()}>
                                                <Space>
                                                    <DownOutlined />
                                                </Space>
                                            </a>
                                        </Dropdown>
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