import React, { useContext, useState } from 'react';
import { taskContext } from "../App";
import { todoType } from '../App';
import { todo } from '../Interface';

const TodoDropdown = () => {
    const { taskList, setTaskList } = useContext(taskContext)
    const [expand, setExpand] = useState<boolean>(false)
    let x = ">";

    const handleDropdown = (id: number) => {
        console.log(taskList)
        const description = taskList.map((item) => {
         return   id === item.id ? setExpand(!expand) : "";
        })
        //setTaskList(description)
    }
    return (
        <div>
            {taskList.map((item) => {
                return <div>
                    <p>{item.isDone}</p>
                    <p>{item.taskName}</p>
                    <p>{item.dueDate}</p>
                    <div style={{ backgroundColor: "red" }} onClick={() => handleDropdown(item.id)}>{x}</div>
                </div>
            })}
           
        </div>
    )
}

export default TodoDropdown