import { Fragment, useEffect, useState } from "react";
import classes from "./MenuItem.module.css";
import Dropdown from "../Dropdown/Dropdown";
import RightClickMenu from "../RightClickMenu/RightClickMenu";

const MenuItem = (props) => {
  const contextClickHandler = (e) => {
    e.preventDefault();
    props.handleContextClick(
      {
        x: e.clientX,
        y: e.clientY - 100,
      },
      props.item.id
    );
  };

  return (
    <li className={classes["menu-item"]}>
      {props.item.children ? (
        <Fragment>
          <button
            type="button"
            onClick={() => props.handleDropdownClick(props.item.id)}
            onContextMenu={(e) => {
              contextClickHandler(e);
            }}
          >
            {props.item.title}
            {props.depthLevel > 0 ? (
              <span className={classes["right-arrow"]}>&rArr;</span>
            ) : (
              <span className={classes["down-arrow"]}></span>
            )}
          </button>
          <Dropdown
            children={props.item.children}
            dropdown={props.dropdownItem === props.item.id}
            depthLevel={props.depthLevel}
            handleDropdownClick={props.handleDropdownClick}
            handleContextClick={props.handleContextClick}
            jsonData={props.jsonData}
            modalOpenHandler={props.modalOpenHandler}
            closeContextMenu={props.closeContextMenu}
          />
        </Fragment>
      ) : (
        <div
          onContextMenu={(e) => {
            contextClickHandler(e);
          }}
        >
          {props.item.title}
        </div>
      )}
    </li>
  );
};

export default MenuItem;
