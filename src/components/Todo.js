import React from "react";
import "./Todo.css";
import { useState, useRef, useEffect } from "react";
import { AiFillDelete } from "react-icons/ai";
import { FaRegEdit } from "react-icons/fa";
import { IoMdDoneAll } from "react-icons/io";

export default function Todo() {
  const [todo, todoinput] = useState("");
  const [todos, setTodos] = useState([]);
  const [EditId, setEditId] = useState(0);

  
    const addTodo = () => {
      if (todo.trim() === "") {
        return;
      }
      if (todos.some((item) => item.list === todo)) {
        alert('Todo already exists!');
        return;
      }
    if (todo !== "") {
      setTodos([...todos, { list: todo, id: Date.now(), status: false }]);
      todoinput("");
    }

    if (EditId) {
      const editTodos = todos.find((todo) => todo.id === EditId);
      const upadateTodo = todos.map((to) =>
        to.id === editTodos.id
          ? (to = { id: to.id, list: todo })
          : (to = { id: to.id, list: to.list })
      );
      setTodos(upadateTodo);
      setEditId(0);
      todoinput("");
    }
  };
  const reset=()=>{
    setTodos([])
  }
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  const inputRef = useRef("null");
  useEffect(() => {
    inputRef.current.focus();
  }, []);
  const onDelete = (id) => {
    setTodos(todos.filter((to) => to.id !== id));
  };

  const onComplete = (id) => {
    let complete = todos.map((list) => {
      if (list.id === id) {
        return { ...list, status: !list.status };
      }
      return list;
    });
    setTodos(complete);
  };
  const onEdit = (id) => {
    const editTodo = todos.find((to) => to.id === id);
    todoinput(editTodo.list);
    setEditId(editTodo.id);
  };

  return (
    <div className="container">
      <h2>TODO APP</h2>
      <form className="form-group" onSubmit={handleSubmit}>
        <input
          type="text"
          value={todo}
          ref={inputRef}
          placeholder="Enter your Todo"
          className="form-controler"
          onChange={(event) => todoinput(event.target.value)}
        />
        <button onClick={addTodo}>{EditId ? "Edit" : "Add"}</button>
      </form>
      <div className="list">
        <ul>
          {todos.map((to) => (
            <li className="list-items">
              <span
                className="list-item-list"
                id={to.status ? "list-item" : ""}
              >
                {to.list}{" "}
              </span>
              <span>
                <IoMdDoneAll
                  className="list-item-icons"
                  id="complete"
                  tittle="complete"
                  onClick={() => onComplete(to.id)}
                />
                <FaRegEdit
                  className="list-item-icons"
                  id="Edit"
                  tittle="Edit"
                  onClick={() => onEdit(to.id)}
                />
                <AiFillDelete
                  className="list-item-icons"
                  id="delete"
                  tittle="Delete"
                  onClick={() => onDelete(to.id)}
                />
              </span>
            </li>
            
          ))}

          <button className="resetBUtton" onClick={reset}>Reset</button>
        </ul>
      </div>
    </div>
  );
}
