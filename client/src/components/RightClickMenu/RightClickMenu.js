import React, { useState, useEffect } from "react";
import classes from "../MenuItem/MenuItem.module.css";

const RightClickMenu = (props) => {
  const editHandler = () => {
    props.modalOpenHandler("Edit");
    props.closeContext();
  };

  const addHandler = () => {
    props.modalOpenHandler("Add");
    props.closeContext();
  };

  const deleteHandler = () => {
    props.deleteHandler();
    props.closeContext();
  };
  return (
    <div
      style={{
        marginTop: props.points.y,
        marginLeft: props.points.x,
      }}
      className={classes["context-menu-wrap"]}
    >
      <ul className={classes["context-menu"]}>
        <li className={classes["menu-item"]} onClick={editHandler}>
          Edit
        </li>
        <li className={classes["menu-item"]} onClick={addHandler}>
          Add
        </li>
        <li className={classes["menu-item"]} onClick={deleteHandler}>
          Delete
        </li>
      </ul>
    </div>
  );
};

export default RightClickMenu;
