import { Fragment, useState } from "react";
import classes from "./MenuItem.module.css";
import Dropdown from "../Dropdown/Dropdown";

const MenuItem = (props) => {
  const renderMenuItem = () => {
    if (props.item.children) {
      return (
        <Fragment>
          <button
            type="button"
            onClick={() => props.handleDropdownClick(props.item.id)}
          >
            {props.item.title}
            {props.depthLevel > 0 ? (
              <span className={classes["right-arrow"]}>&rArr;</span>
            ) : (
              <span className={classes["down-arrow"]}></span>
            )}
          </button>
          <Dropdown
            submenus={props.item.children}
            dropdown={props.dropdownItem === props.item.id}
            depthLevel={props.depthLevel}
            handleDropdownClick={props.handleDropdownClick}
          />
        </Fragment>
      );
    } else {
      return <a>{props.item.title}</a>;
    }
  };

  return <li className={classes["menu-item"]}>{renderMenuItem()}</li>;
};

export default MenuItem;
