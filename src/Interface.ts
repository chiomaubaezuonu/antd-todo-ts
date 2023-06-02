export type todo = {
    id: number,
    taskName :string,
    dueDate : string,
    isDone : boolean 
}
export type propsType ={
  taskList : string,
  setTaskList : React.Dispatch<React.SetStateAction<todo[]>>
}