import React, { useState, useEffect } from "react";
import "./todo.css";
import TodoCards from "./TodoCards";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Update from "./Update";
import axios from "axios";

const Todo = () => {
  const token = localStorage.getItem("token");
  const [inputs, setInputs] = useState({ title: "", body: "" });
  const [todos, setTodos] = useState([]);
  const id = localStorage.getItem("userId");
  const [editTodo, setEditTodo] = useState(null);

  // Fetch todos from backend
  const fetchTodos = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/todo/get", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTodos(res.data); // depends on backend response
    } catch (err) {
      console.error(err.response?.data || err.message);
      toast.error("Failed to fetch tasks");
    }
  };

  useEffect(() => {
    if (token) fetchTodos();
  }, [token]);

  // Handle input change
  const change = (e) => {
    const { name, value } = e.target;
    setInputs({ ...inputs, [name]: value });
  };

  // Add new todo
  const Submit = async () => {
    if (inputs.title.trim() === "" && inputs.body.trim() === "") {
      toast.error("Please enter something!");
      return;
    }

    if (token) {
      try {
        const response = await axios.post(
          "http://localhost:5000/api/todo/add",
          {
            title: inputs.title,
            description: inputs.body,
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        setTodos([...todos, response.data.todo]);
        toast.success("Your Task Is Added & Saved!");
      } catch (err) {
        console.error(err.response?.data || err.message);
        toast.error("Failed to save task in database");
      }
    } else {
      setTodos([...todos, inputs]);
      toast.success("Your Task Is Added Locally");
    }

    setInputs({ title: "", body: "" });
  };

  const del = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/todo/delete/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Update state after successful delete
      setTodos(todos.filter((todo) => todo._id !== id));
      toast.info("Todo Deleted!!");
    } catch (err) {
      console.error(err.response?.data || err.message);
      toast.error("Failed to delete todo");
    }
  };

  const show = () => {
    document.getElementById("text-area").style.display = "block";
  };

  const dis = (value , todo = null) => {
    document.getElementById("todo-update").style.display = value;
    if (todo) {
    setEditTodo(todo); // set the todo to be updated
  }
  };

  return (
    <>
      <div className="todo d-flex flex-column">
        <div className="todo-main container d-flex justify-content-center align-items-center">
          <div className="d-flex flex-column w-50 todo-inputs">
            <input
              type="text"
              placeholder="TITLE"
              className="my-2"
              onClick={show}
              name="title"
              value={inputs.title}
              onChange={change}
            />
            <textarea
              placeholder="BODY"
              className="p-2"
              id="text-area"
              name="body"
              value={inputs.body}
              onChange={change}
            />
          </div>
          <button className="submit-button mx-3" onClick={Submit}>
            Add
          </button>
        </div>

        <div className="todo-body">
          <div className="container-fluid">
            <div className="row ">
              {todos &&
                todos.map((item) => (
                  <div className="col-lg-3 col-10 x-5 my-5 " key={item._id}>
                    <TodoCards
                      _id={item._id} // pass backend _id here
                      title={item.title}
                      body={item.description || item.body}
                      delid={del}
                      display={ () => dis ("block" , item)}
                    />
                  </div>
                ))}
            </div>
          </div>
        </div>
        <ToastContainer position="top-right" autoClose={2000} />
      </div>

      <div className="todo-update" id="todo-update">
        <div className="container update">
          <Update display={dis} editTodo={editTodo} fetchTodos={fetchTodos} />
        </div>
      </div>
    </>
  );
};

export default Todo;
