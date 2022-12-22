import React from 'react'
import { useState } from 'react';

const ToDoList = ()=>{
  const [todos, setTodos] = useState([]);
  const [todo, setTodo] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [currentTodo, setCurrentTodo] = useState("");
  function handleInputChange(event) {
    setTodo(event.target.value);
  }
  function handleEditInputChange(event) {
    setCurrentTodo({ ...currentTodo, text: event.target.value });
    console.log(currentTodo);
  }

  function handleFormSubmit(event) {
    event.preventDefault();

    if (todo !== "") {
      setTodos([...todos,{id: todos.length + 1,text: todo.trim()}]);
    }
    setTodo("");
  }

  function handleEditFormSubmit(event) {
    event.preventDefault();

    handleUpdateTodo(currentTodo.id, currentTodo);
  }

  function handleDeleteClick(id) {
    const removeItem = todos.filter((todo) => {
      return todo.id !== id;
    });
    setTodos(removeItem);
  }
  function handleUpdateTodo(id, updatedTodo) {
    const updatedItem = todos.map((todo) => {
      return todo.id === id ? updatedTodo : todo;
    });
  
    setIsEditing(false);
    setTodos(updatedItem);
  }
  function handleEditClick(todo) {
    setIsEditing(true);
    setCurrentTodo({ ...todo });
  }

  return (
    <div id="main">
    <div className="App">
      {isEditing ? (
        <form onSubmit={handleEditFormSubmit}>
          <input name="editTodo" id="task" type="text" placeholder="Edit todo" value={currentTodo.text} onChange={handleEditInputChange}/>
          <button type="submit" id="btn">Update</button>
          <button id="btn" onClick={() => setIsEditing(false)}>Cancel</button>
        </form>) :
      (
        <form onSubmit={handleFormSubmit}>
          <input name="todo" type="text" placeholder="Create a new todo" value={todo} onChange={handleInputChange}/>
          <button type="submit">Add</button>
        </form>
      )}
    </div>
    <div>
<ul className="todo-list">
        {todos.map((todo) => (
          <li className="list" key={todo.id}>
            {todo.text}
            <button onClick={() => handleEditClick(todo)} className="edit-btn">Edit</button>
            <button onClick={() => handleDeleteClick(todo.id)} className="delete-btn">Delete</button>
          </li>
        ))}
      </ul>
    </div>

    </div>
  );
}

export default ToDoList;
