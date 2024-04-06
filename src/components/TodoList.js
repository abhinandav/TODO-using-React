import React, { useState } from 'react';
import TodoForm from './TodoForm';
import Todo from './Todo';

function TodoList() {
    const [todos, setTodos] = useState([]);
    const [whitespaceError, setWhitespaceError] = useState('');
    const [duplicateError, setDuplicateError] = useState('');

    const addTodo = (todo) => {
        // Check for empty or whitespace-only todos
        if (!todo.text || /^\s*$/.test(todo.text)) {
            setWhitespaceError('Type Something....');
            setDuplicateError('');
            return;
        }

        // Check for duplicate todos 
        const isDuplicate = todos.some((existingTodo) => existingTodo.text === todo.text);
        if (isDuplicate) {
            setDuplicateError('Duplicate todo found!');
            setWhitespaceError('');
            return;
        }

        // If not a duplicate, add the new todo
        const newTodos = [todo, ...todos];
        setTodos(newTodos);
        setWhitespaceError('');
        setDuplicateError('');
    };

    const updatedTodo = (todoId, newValue) => {
        if (!newValue.text || /^\s*$/.test(newValue.text)) {
            return;
        }
        setTodos((prev) => prev.map((item) => (item.id === todoId ? newValue : item)));
    };

    const removeTodo = (id) => {
        const removeArr = [...todos].filter((todo) => todo.id !== id);
        setTodos(removeArr);
    };

    const completeTodo = (id) => {
        let updatedTodos = todos.map((todo) => {
            if (todo.id === id) {
                todo.isComplete = !todo.isComplete;
            }
            return todo;
        });
        setTodos(updatedTodos);
    };

    return (
        <div>
            <h1>What's the plan Today</h1>
            <TodoForm onSubmit={addTodo} />
            {whitespaceError && <p className="error-message" style={{ color: 'red' }}>{whitespaceError}</p>}
            {duplicateError && <p className="error-message" style={{ color: 'red' }}>{duplicateError}</p>}
            <Todo todos={todos} completeTodo={completeTodo} removeTodo={removeTodo} updateTodo={updatedTodo} />
        </div>
    );
}

export default TodoList;
