import React from "react";
import { MdDelete } from "react-icons/md";
import { RxUpdate } from "react-icons/rx";

const TodoCards = ({ title, body, _id, delid, display }) => {
  return (
    <div className="card p-2">
      <div>
        <h3>{title}</h3>
        <p>{body ? body.substring(0, 77) : ""}</p>
      </div>

      <div className="d-flex justify-content-around">
        <div
          className="card-icons"
          onClick={() => {
            display("block");
          }}
        >
          <RxUpdate className="card-icon" /> Update
        </div>

        <div
          className="card-icons"
          onClick={() => {
            delid(_id);
          }}
        >
          <MdDelete className="card-icon del" /> Delete
        </div>
      </div>
    </div>
  );
};

export default TodoCards;
