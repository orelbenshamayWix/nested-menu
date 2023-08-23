import React, { useState } from "react";
import classes from "./Modal.module.css";

const Modal = (props) => {
  const [text, setText] = useState("");

  const closeHandler = () => {
    setText("");
    props.modalCloseHandler();
  };

  const textChangeHandler = (e) => {
    setText(e.target.value);
  };

  const submitHandler = () => {
    if (text === "") {
      return;
    } else if (props.action === "Edit") {
      props.modalSubmitEditHandler(text);
    } else {
      props.modalSubmitAddHandler(text);
    }
  };

  return (
    <div className={classes.modal}>
      <div className={classes.header}>
        <h2>{props.action}</h2>
        <button className={classes.close} onClick={closeHandler}>
          &times;
        </button>
      </div>
      <div className={classes["submit-wrap"]}>
        <textarea placeholder="Edit" onChange={textChangeHandler} />
        <button onClick={submitHandler}>Submit</button>
      </div>
    </div>
  );
};

export default Modal;
