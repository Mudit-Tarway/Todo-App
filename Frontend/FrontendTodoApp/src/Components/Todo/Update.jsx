import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const Update = ({ display, editTodo, fetchTodos }) => {
  const token = localStorage.getItem("token");
  const [title, setTitle] = useState("");
  const [description , setDescription] = useState("");

  // Load todo into input fields
  useEffect(() => {
    if (editTodo) {
      setTitle(editTodo.title);
      setDescription(editTodo.description );
    }
  }, [editTodo]);

  const handleUpdate = async () => {
    try {
      const res = await axios.put(
        `http://localhost:5000/api/todo/update/${editTodo._id}`,
        { title, description },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      toast.success("Todo updated!");
      fetchTodos(); // refresh todos after update
      display("none");
    } catch (err) {
      toast.error("Failed to update todo");
    }
  };

  return (
    <div className="p-5 d-flex justify-content-center align-items-start flex-column update">
      <h1>Update Your Task</h1>

      <input
        type="text"
        className="todo-inputs my-4 w-100 p-3"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <textarea
        className="todo-inputs w-100 p-3"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <div className="d-flex justify-content">
        <button className="btn btn-dark my-4" onClick={handleUpdate}>
          UPDATE
        </button>

        <button className="btn btn-danger m-4" onClick={() => display("none")}>
          Close
        </button>
      </div>
    </div>
  );
};

export default Update;
