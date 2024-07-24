import React from "react";
import "./Item.scss";
import { Info, ItemP } from "../StyledComponents/FormComp";

const Item = ({ data, handleDelete, handleEdit }) => {
  return (
    <div>
      {data.map((item) => (
        <Info className="user-info" key={item.id}>
          <ItemP>First Name: {item.firstname}</ItemP>
          <ItemP>Last Name: {item.lastname}</ItemP>
          <ItemP>Gender: {item.gender}</ItemP>
          <ItemP>Email: {item.email}</ItemP>
          <ItemP>About: {item.about}</ItemP>
          <button
            className="delete"
            onClick={() => {
              handleDelete(item.id);
            }}
          >
            Delete
          </button>
          <button
            className="update"
            onClick={() => {
              handleEdit(item);
            }}
          >
            Update
          </button>
        </Info>
      ))}
    </div>
  );
};

export default Item;
