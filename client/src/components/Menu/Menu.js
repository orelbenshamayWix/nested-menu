import React, { useState, useEffect, useRef } from "react";
import { menuItems } from "../../DATA";
import classes from "./Menu.module.css";
import MenuItem from "../MenuItem/MenuItem";

const Menu = (props) => {
  const [dropdownItem, setDropdownItem] = useState(null);
  let ref = useRef();

  useEffect(() => {
    const handler = (event) => {
      if (dropdownItem && ref.current && !ref.current.contains(event.target)) {
        setDropdownItem(null);
      }
    };
    document.addEventListener("mousedown", handler);
    document.addEventListener("touchstart", handler);
    return () => {
      document.addEventListener("mousedown", handler);
      document.addEventListener("touchstart", handler);
    };
  }, [dropdownItem]);

  const handleDropdownClick = (id) => {
    if (id === dropdownItem) {
      setDropdownItem(null);
      return;
    }
    setDropdownItem(id);
  };
  return (
    <nav className={classes["nav-area"]} ref={ref}>
      <a className={classes["menu-name"]}>{props.name}</a>
      <ul className={classes.menu}>
        {menuItems.map((item, index) => {
          return (
            <MenuItem
              item={item}
              key={index}
              depthLevel={0}
              handleDropdownClick={handleDropdownClick}
              dropdownItem={dropdownItem}
            />
          );
        })}
      </ul>
    </nav>
  );
};

export default Menu;
