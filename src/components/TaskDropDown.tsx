import React, { useContext, useState } from 'react';
import { DownOutlined, SmileOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Dropdown, Space } from 'antd';
import taskContext from '../App'
import { todoType } from '../App';
import { todo } from '../Interface';
import { type } from 'os';

// type DropTaskType = {
//     taskList: todo[],
//     setTaskList: React.Dispatch<React.SetStateAction<todo[]>>
// }

const items: MenuProps['items'] = [
    {
        key: '1',
        label: (
            <p rel="noopener noreferrer" >
                taskList.taskName
            </p>
        ),
    },
    {
        key: '2',
        label: (
            <a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">
                2nd menu item (disabled)
            </a>
        ),
        icon: <SmileOutlined />,
        disabled: true,
    },

    {
        key: '4',
        danger: true,
        label: 'a danger item',
    },
];


const TaskDropDown= ({taskList, setTaskList}:todoType) => {
   // const {taskList, setTaskList} = useContext(taskContext)
   //const [taskList, setTaskList] = useState<todo[]>([])
    return (
        <div>

            < Dropdown className='dropTask' menu={{ items }}>
                <a onClick={(e) => e.preventDefault()}>
                    <Space>
                        <DownOutlined />
                    </Space>
                </a>
                
            </Dropdown >
        </div>
    )
};

export default TaskDropDown;// {
    //     key: '3',
    //     label: (
    //         <a target="_blank" rel="noopener noreferrer" href="https://www.luohanacademy.com">
    //             3rd menu item (disabled)
    //         </a>
    //     ),
    //     disabled: true,
    // },