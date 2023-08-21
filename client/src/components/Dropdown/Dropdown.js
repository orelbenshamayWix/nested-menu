import classesDropdown from "./Dropdown.module.css";
import MenuItem from "../MenuItem/MenuItem";
import { useState } from "react";

const Dropdown = (props) => {
  const [dropdownItem, setDropdownItem] = useState(null);

  const handleDropdownClick = (id) => {
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
      {props.submenus.map((submenu, index) => {
        return (
          <MenuItem
            item={submenu}
            key={index}
            depthLevel={depthLevel}
            handleDropdownClick={handleDropdownClick}
            dropdownItem={dropdownItem}
          />
        );
      })}
    </ul>
  );
};

export default Dropdown;
