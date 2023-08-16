import React, { ChangeEvent, useEffect, useState } from 'react';
import sitter from "../images/sitter.png"
import { Button, Checkbox, Col, Input, DatePicker, Modal, Row, Select, Space, Progress, Switch } from 'antd';
//ngimport { todo } from '../Interface';
import { todoType } from '../App';
import noTask from "../images/noTask-img.png";
import '../App.css'
import Title from 'antd/es/typography/Title';
import type { CheckboxChangeEvent } from 'antd/es/checkbox';
import { DownOutlined, SmileOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { checkServerIdentity } from 'tls';
import { stringify } from 'querystring';
import dayjs, { Dayjs } from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';



const data = localStorage.getItem('TODO_LIST')

const acquiredData = data ? JSON.parse(data) : []
 const countData = localStorage.getItem('Count')
const cd =  countData ? JSON.parse(countData) : 0 
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
const { RangePicker } = DatePicker;
const TodoList = () => {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    // const [dateRange, setDateRange] = useState<null | [Dayjs, Dayjs]>(null);
    const [newTask, setNewTask] = useState<string>("");
    const [taskList, setTaskList] = useState<Todo[]>(acquiredData)
    const [taskStatus, setTaskStatus] = useState<string>("");
    const [todoPage, setTodoPage] = useState<boolean>(false);
    const [filtered, setFiltered] = useState<Todo[]>(acquiredData)
    const [countChecked, setCountChecked] = useState<number>(cd)

    // const style = {
    //     backgroundColor: myChecked ? "gray" : "",
    //     opacity: myChecked ? "1" : ""
    // }
    // console.log(dateRange)
    // dayjs.extend(relativeTime);
    // const date = dayjs().add(7, 'days')
    // const relativeDate = date.fromNow();


    const taskProgress = countChecked / taskList.length * 100;
    const taskPercentage = Number(taskProgress.toFixed())
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
        setFiltered([...taskList, myTask])
        setNewTask("")
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const addTask = (e: ChangeEvent<HTMLInputElement>): void => {
        e.preventDefault()
        setNewTask(e.target.value)
    }
    useEffect(() => {
        localStorage.setItem('TODO_LIST', JSON.stringify(taskList))
    }, [taskList])
    useEffect(() => {
        localStorage.setItem('Count', JSON.stringify(countChecked))
    }, [countChecked])

    useEffect(() => {
      console.log("taskList", taskList)
      console.log("filtered", filtered)
      console.log(taskPercentage)
    }, [taskList, filtered]);
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
                                    <Col>{countChecked}/ {taskList.length} tasks left</Col>
                                    <Progress percent={taskPercentage} size="small" />
                                </div></Col>
                        </Col>
                        <Col className='todo-btns'>
                            <Select
                                value={taskStatus}
                                style={{ width: 150 }}
                                onChange={newTaskStatus => {
                                    setTaskStatus(newTaskStatus)
                                    if (newTaskStatus === "Completed Tasks") {
                                        setFiltered(taskList.filter((current) => {
                                            return current.isDone === true
                                        }))
                                    }

                                    else if (newTaskStatus === "Pending Tasks") {
                                        const p = taskList.filter((current) => {
                                            return current.isDone === false
                                        })
                                        setFiltered(p)
                                    }
                                    else {
                                        setFiltered(taskList)
                                    }
                                }}

                            >
                                <Option key="allTask" value=""> All Tasks</Option>
                                <Option key="completedTasks" value="Completed Tasks"> Completed Tasks</Option>
                                <Option value="Pending Tasks"> Pending Tasks</Option>
                                <Option value="overdueTasks"> Overdue Tasks</Option>
                            </Select>
                            <Button type="primary" className='addTask-btn' onClick={showModal}>
                                + Add a task
                            </Button>
                        </Col>
                        <Modal className='modal' title="Add Task" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                            <Input type='text' onChange={addTask} value={newTask} placeholder='Enter Task...' />
                            <Space direction="vertical" size={12}>
                                {/* <RangePicker
                                    onChange={(dayjsArr) => {
                                        setDateRange(dayjsArr as null | [Dayjs, Dayjs])
                                    }}
                                /> */}
                                {/* <RangePicker showTime /> */}
                            </Space>
                        </Modal>
                        {
                            filtered.sort((a, b) => b.id - a.id).map((item) => {
                                return <Col key={item.id}>
                                    <Col className='todo-group' style={{ color: item.isDone ? "gray" : "", opacity: item.isDone ? "0.7" : "" }}>
                                        <Col className='todos'>
                                            <Checkbox checked={item.isDone}
                                                onChange={(e: CheckboxChangeEvent) => {
                                                    const newList: any = filtered.map(task => {
                                                        if (task.id === item.id) {
                                                            e.target.checked === true ? setCountChecked(countChecked + 1) : setCountChecked(countChecked - 1)
                                                            return {
                                                                ...task,
                                                                isDone: e.target.checked
                                                            }
                                                        }
                                                        else {
                                                            return task
                                                        }

                                                    })
                                                    setFiltered(newList)
                                                    setTaskList(newList)
                                                }
                                                }
                                            />
                                            <Col> {item.taskName}</Col>
                                            {/* <Col>{dateRange ? dateRange[0].format("DD-MM-YYYY") + "-" +
                                                dateRange[1].format("DD-MM-YYYY") : "Please pick a date"}</Col> */}
                                        </Col>
                                        <Select style={{ width: "100px" }} bordered={false}
                                            onChange={(taskToDelete) => {
                                                console.log(taskToDelete.taskName)
                                                if (taskToDelete.taskName !== item.taskName) {
                                                    setFiltered(taskList.filter((deleteTask) => {
                                                        return deleteTask.taskName !== item.taskName
                                                    }))
                                                }
                                            }}
                                        >
                                            <Option key="completedTasks" value="completedTasks">Due Date</Option>
                                            <Option value="deleteTask">Delete</Option>
                                        </Select>
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
 // return deleteTask.taskName === item.taskName ? false : true