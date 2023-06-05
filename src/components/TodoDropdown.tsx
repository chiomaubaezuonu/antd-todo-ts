import React, { useContext, useState } from 'react';
import { taskContext } from "../App";
import { todoType } from '../App';
import { todo } from '../Interface';


type DropDownType = {
    taskList: todo[],
    setTaskList: React.Dispatch<React.SetStateAction<todo[]>>
}

const TodoDropdown = () => {
    const { taskList, setTaskList } = useContext(taskContext)
    const [expand, setExpand] = useState<boolean>(false)
    let x = ">";

    const handleDropdown = () => {
        alert("yes")
        // taskList.map((item) => {
        //     if (item.id === id) {
        //         setExpand(!expand)
        //     }
        // })
    }

    return (
        <div>
            <p className='dropDown' onClick={handleDropdown}> {x} </p>
            {expand && taskList.map((item) => {
                return <div>
                    <h1>{item.taskName}</h1>
                    <h1>{item.isDone}</h1>
                </div>
            })}
        </div>
    )
}

export default TodoDropdown