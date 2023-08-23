import classesDropdown from "./Dropdown.module.css";
import MenuItem from "../MenuItem/MenuItem";
import { useState } from "react";

const Dropdown = (props) => {
  const [dropdownItem, setDropdownItem] = useState(null);

  const handleDropdownClick = (id) => {
    props.closeContextMenu();
    if (id === dropdownItem) {
      setDropdownItem(null);
      return;
    }
    setDropdownItem(id);
  };
  const depthLevel = props.depthLevel + 1;
  return (
    <ul
      className={`${classesDropdown.dropdown} ${
        props.dropdown ? classesDropdown.show : ""
      } ${depthLevel > 1 ? classesDropdown["dropdown-submenu"] : ""}`}
    >
      {props.children.map((child) => {
        return (
          <MenuItem
            item={props.jsonData[child]}
            key={child}
            depthLevel={depthLevel}
            handleDropdownClick={handleDropdownClick}
            dropdownItem={dropdownItem}
            handleContextClick={props.handleContextClick}
            jsonData={props.jsonData}
            modalOpenHandler={props.modalOpenHandler}
            closeContextMenu={props.closeContextMenu}
          />
        );
      })}
    </ul>
  );
};

export default Dropdown;
