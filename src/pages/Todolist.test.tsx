import { render, screen, fireEvent } from '@testing-library/react';
import Todolist from '../pages/TodoList';
// import * as React from 'react';
// import Input from 'antd/es/input/Input';


describe("Input", () => {
    it("Should render input element", () => {
        render(<Todolist />);
        const inputElement = screen.getByPlaceholderText(/Enter Task.../i);
        expect(inputElement).toBeInTheDocument();
    });


















    // it('Should be able to type in input', async () => {
    //     render(<Todolist 
    //     />);
    //     const inputElement = screen.getByPlaceholderText(/Enter task.../i);
    //     fireEvent.change(inputElement, { target: { value: "code" } } )
    //     expect(inputElement.value).toBe("code");
    // });
    // it('Should empty input when add button is clicked', async () => {
    //     render(<AddInput todos={[]}
    //         setTodos={mockesSetTodod}
    //     />);
    //     const inputElement = screen.getByPlaceholderText(/Add a new task here.../i);
    //     const buttonElement = screen.getByRole("button", {name : /add/i});
    //     fireEvent.change(inputElement, { target: { value: "Go girl" } } )
    //     fireEvent.click(buttonElement)
    //     expect(inputElement.value).toBe("");
    // });
})
