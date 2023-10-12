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
//  const taskIsoStringConvertedToDayjs;
let acquiredData = data ? JSON.parse(data) : []
acquiredData = acquiredData.map((eachTaskDate: any) => {
    return {
        ...eachTaskDate,
        dueDate: eachTaskDate.dueDate ? dayjs(eachTaskDate.dueDate) : ""
    }
})


type Todo = {
    id: number,
    taskName: string,
    dueDate: null | Dayjs,
    isDone: boolean,
}
export type propsType = {
    taskList: string,
    setTaskList: React.Dispatch<React.SetStateAction<Todo[]>>
}
const { Option } = Select;
const TodoList = () => {



    const TodoPercentage = localStorage.getItem('TODO_PERCENTAGE')
    const savedTodoPercentage = TodoPercentage ? JSON.parse(TodoPercentage) : ""
    //let savedDataPercent = dataPercent ? JSON.parse(dataPercent) : 0;
    const data1 = localStorage.getItem('COUNT')
    const data2 = data1 ? JSON.parse(data1) : ""
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [newTaskDate, setNewTaskDate] = useState<null | Dayjs>(null);
    const [newTask, setNewTask] = useState<string>("");
    const [taskList, setTaskList] = useState<Todo[]>(acquiredData)
    const [taskStatus, setTaskStatus] = useState<string>("");
    const [todoPage, setTodoPage] = useState<boolean>(false);
    const [filtered, setFiltered] = useState<Todo[]>(acquiredData)
    const [countChecked, setCountChecked] = useState<number>(0)
    let countNum = 0
    countNum = data2
    const [count, setCount] = useState(countNum)

    const taskProgress = countChecked / taskList.length * 100;
    let taskPercentage = Number(taskProgress.toFixed())
    taskPercentage = savedTodoPercentage
    const [taskPercent, setTaskPercent] = useState(taskPercentage)


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
    function generateFilteredTask(newTaskList: Todo[], newTaskStatus: string) {
        setTaskList(newTaskList)
        setTaskStatus(newTaskStatus)
        if (newTaskStatus === "Completed Tasks") {
            setFiltered(newTaskList.filter((current) => {
                return current.isDone === true
            }))
        }

        else if (newTaskStatus === "Pending Tasks") {
            const pendingTasks = newTaskList.filter((current) => {
                return current.isDone === false
            })
            setFiltered(pendingTasks)
        }
        else if (newTaskStatus === "Overdue Tasks") {
            const taskDate = new Date()
            const overdueTasks = newTaskList.filter((current) => {
                let currentTaskDateIsoString: string | undefined = current.dueDate?.toISOString();
                let newDateIsoString = taskDate.toISOString()
                return current.isDone === false && currentTaskDateIsoString ? currentTaskDateIsoString < newDateIsoString : ""
            })
            setFiltered(overdueTasks)
            
        }
        else {
            setFiltered(newTaskList)
        }
    };
    const handleOk = () => {
        if (newTask === "") {
            return ""
        }
        const myTask = {
            id: taskList.length === 0 ? 1 : taskList.length + 1,
            taskName: newTask,
            dueDate: newTaskDate,
            isDone: false
        }
        const newTaskList = [...taskList, myTask]

        setNewTask("")
        setIsModalOpen(false);
        generateFilteredTask(newTaskList, taskStatus)
    }

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const addTask = (e: ChangeEvent<HTMLInputElement>): void => {
        e.preventDefault()
        setNewTask(e.target.value)
    }
    useEffect(() => {
        const taskListWithIsoString = taskList.map((eachTask) => {
            return {
                ...eachTask,
                dueDate: eachTask.dueDate ? eachTask.dueDate.toISOString() : ""
            }
        })
        localStorage.setItem('TODO_LIST', JSON.stringify(taskListWithIsoString))
    }, [taskList])
    // useEffect(() => {
    //     localStorage.setItem('TODO_PERCENTAGE', JSON.stringify(taskPercent))
    // }, [taskPercent])
    // useEffect(() => {
    //     localStorage.setItem('TODO_PERCENTAGE', JSON.stringify(taskPercent))
    // }, [taskPercent])
    // function func(taskList: Todo[]) {
    //     if (taskList) {
    //         setTaskList(taskList.sort((a: any, b: any): any => {
    //             console.log(a.dueDate - b.dueDate)
    //         }))
    //     }
    // }
    // console.log(func(taskList))
    useEffect(() => {
        localStorage.setItem('TASK_PERCENT', JSON.stringify(taskPercent))
    }, [taskPercent])

    useEffect(() => {
        localStorage.setItem('COUNT', JSON.stringify(count))
    }, [count])
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
                            <Title level={5} id='taskList-title'>Task List</Title>
                            <Col>
                                {/* <Col style={{ color: "gray" }}>  Task completed {countChecked + "/" + taskList.length}</Col> */}
                                <div style={{ width: 170 }}>
                                    <Col className='taskPercentage'>{countChecked}/ {taskList.length} tasks left</Col>
                                    <Col>{""}</Col>
                                    {/* <Progress className='progress' trailColor='#ECF0F6' strokeColor="#718391" percent={taskPercentage} size="small" /> */}
                                    <Progress className='progress' trailColor='#ECF0F6' strokeColor="#718391" percent={taskPercent} size="small" />
                                </div></Col>
                        </Col>
                        <hr className='todo-hr' />
                        <Col className='todo-btns' id="allTasks">
                            <Select
                                //  id='ant-select-selector'
                                value={taskStatus}
                                style={{ width: 150 }}
                                onChange={newTaskStatus => {
                                    setTaskStatus(newTaskStatus)
                                    generateFilteredTask(taskList, newTaskStatus)
                                    // if (newTaskStatus === "Completed Tasks") {
                                    //     setFiltered(taskList.filter((current) => {
                                    //         return current.isDone === true
                                    //     }))
                                    // }
                                    // else if (newTaskStatus === "Pending Tasks") {
                                    //     const p = taskList.filter((current) => {
                                    //         return current.isDone === false
                                    //     })
                                    //     setFiltered(p)
                                    // }
                                    // else {
                                    //     setFiltered(taskList)
                                    // }
                                }}
                            >
                                <Option key="allTask" value=""> All Tasks</Option>
                                <Option key="completedTasks" value="Completed Tasks"> Completed Tasks</Option>
                                <Option value="Pending Tasks"> Pending Tasks</Option>
                                <Option key="overdueTasks" value="Overdue Tasks"> Overdue Tasks</Option>
                            </Select>
                            <Button type="primary" className='addTask-btn' onClick={showModal}>
                                + Add a task
                            </Button>
                        </Col>
                        <hr className='todo-hr' />
                        <Modal className='modal' title="Add Task" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                            <Input type='text' onChange={addTask} value={newTask} placeholder='Enter Task...' />
                            <Space direction="vertical" size={12}>
                                <DatePicker
                                    //  format={"DD MM YYYY"}
                                    value={newTaskDate}
                                    onChange={(dayjsArr) => {
                                        setNewTaskDate(dayjsArr as null | Dayjs)
                                    }}
                                />
                            </Space>
                        </Modal>
                        {
                            filtered.sort((a, b) => b.id - a.id).map((item) => {
                                return <Col key={item.id}>
                                    <Col className='todo-group' style={{ color: item.isDone ? "#C0CAD4" : "#4E5D69", borderRadius: item.isDone ? "" : '50%', opacity: item.isDone ? "0.7" : "", fontWeight: item.isDone ? "100" : "400" }}>
                                        <Col className='todos'>
                                            <Checkbox checked={item.isDone}
                                                onChange={(e: CheckboxChangeEvent) => {
                                                    const newList: Todo[] = taskList.map(task => {
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
                                                    setTaskList(newList)
                                                    generateFilteredTask(newList, taskStatus)
                                                    // if (taskStatus === "Completed Tasks") {
                                                    //     setFiltered(newList.filter((current) => {
                                                    //         return current.isDone === true
                                                    //     }))
                                                    // }

                                                    // else if (taskStatus === "Pending Tasks") {
                                                    //     const p = newList.filter((current) => {
                                                    //         return current.isDone === false
                                                    //     })
                                                    //     setFiltered(p)
                                                    // }
                                                    // else {
                                                    //     setFiltered(newList)
                                                    // }

                                                }
                                                }
                                            />
                                            <Col style={{ paddingRight: "0.5rem" }}> {item.taskName}</Col>
                                            <Col>
                                                {item.dueDate?.format("ddd, Do MMM YYYY")}
                                                {/* {new Date(item.dueDate).format("ddd MMM YYYY")} */}
                                                {/* {item.dueDate?.format("ddd, Do MMM YYYY")} */}

                                            </Col>
                                            <p></p>
                                        </Col>
                                        <Progress percent={count}></Progress>
                                        <Button onClick={() => { setCount(count + 1) }} >Add</Button>
                                        {/* <Select style={{ width: "100px" }} bordered={false}>
                                            <Option key="completedTasks" value="completedTasks">Due Date</Option>
                                            <Option value="deleteTask">Delete</Option>
                                        </Select> */}
                                        <Col style={{ color: "#00C297" }}>{">"}</Col>
                                    </Col>
                                    <hr className='todo-hr' />

                                </Col>
                            })
                        }

                    </Col>
                </Col>
            }
        </Row >
    )
}

export default TodoList
// return deleteTask.taskName === item.taskName ? false : true
//Put back under where newTaskList was defined
// function generateFilteredTask(newTaskList: Todo[], newTaskStatus: string) {
//     setTaskList(newTaskList)
//     setTaskStatus(newTaskStatus)
//     if (taskStatus === "Completed Tasks") {
//         setFiltered(newTaskList.filter((current) => {
//             return current.isDone === true
//         }))
//     }
//     else if (taskStatus === "Pending Tasks") {
//         const p = newTaskList.filter((current) => {
//             return current.isDone === false
//         })
//         setFiltered(p)
//     }
//     else {
//         setFiltered(newTaskList)
//     }
// };
