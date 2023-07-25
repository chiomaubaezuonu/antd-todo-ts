import React, { useState } from 'react'


interface StudentInfo {
    id: number;
    name: string;
    age: number;
    gender: string
}
const students = [
    {
        id: 1,
        name: "Oma",
        age: 22,
        gender: "female"
    },
    {
        id: 2,
        name: "Jay",
        age: 12,
        gender: "male"
    },
    {
        id: 3,
        name: "Sam",
        age: 29,
        gender: "female"
    },
    {
        id: 4,
        name: "Sheldon",
        age: 22,
        gender: "male"
    }
]
const Tuts = () => {
    const [count,setCount] = useState(0)
//    const studentList = students.map((student) => {
//         return <div style={{paddingRight: "2rem", backgroundColor: "blue"}}>
//             <li>{student.name}</li>
//             <li>{student.age}</li>
//             <li>{student.gender}</li>
//         </div>
 
//     })
    return (
        <div>
            {/* <ul>{studentList}</ul> */}
            <button onClick={() =>setCount(count + 1) }>Click me</button>
            <p> Clicked {count} times</p>
        </div>
    )
}

export default Tuts