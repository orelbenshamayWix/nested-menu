import React, { useState, useEffect, useRef, Fragment } from "react";
import classes from "./Menu.module.css";
import MenuItem from "../MenuItem/MenuItem";
import Modal from "../Modal/Modal";
import RightClickMenu from "../RightClickMenu/RightClickMenu";
import axios from "axios";

const Menu = (props) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalAction, setModalAction] = useState(null);
  const [menuItems, setMenuItems] = useState(null);
  const [dropdownItem, setDropdownItem] = useState(null);
  const [clickedRight, setClickedRight] = useState(null);
  const [contextMenuVisible, setContextMenuVisible] = useState(false);
  const [points, setPoints] = useState(null);
  const firstItem = 1;
  let ref = useRef();

  useEffect(() => {
    const init = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:3001/menu");
        setMenuItems(response.data);
        console.log(response.data);
        console.log(menuItems);
      } catch (e) {
        console.log(e);
      }
    };
    init();
  }, []);

  // useEffect(() => {
  //   const handler = (event) => {
  //     if (dropdownItem && ref.current && !ref.current.contains(event.target)) {
  //       setDropdownItem(null);
  //       setClickedRight(null);
  //       setPoints(null);
  //     }
  //   };
  //   document.addEventListener("mousedown", handler);
  //   document.addEventListener("touchstart", handler);
  //   return () => {
  //     document.addEventListener("mousedown", handler);
  //     document.addEventListener("touchstart", handler);
  //   };
  // }, [dropdownItem]);

  const handleDropdownClick = (id) => {
    setContextMenuVisible(false);
    if (id === dropdownItem) {
      setDropdownItem(null);
      return;
    }
    setDropdownItem(id);
  };

  const handleContextClick = (points, id) => {
    if (clickedRight === id) {
      setContextMenuVisible(false);
      setClickedRight(null);
      setPoints(null);
      return;
    }
    setClickedRight(id);
    setPoints(points);
    setContextMenuVisible(true);
  };

  const modalCloseHandler = () => {
    setModalOpen(false);
  };

  const modalOpenHandler = (action) => {
    setModalOpen(true);
    setModalAction(action);
  };

  const modalSubmitEditHandler = async (newTitle) => {
    try {
      await axios.post(`http://127.0.0.1:3001/menu/${clickedRight}`, {
        newTitle: newTitle,
      });
    } catch (e) {
      console.log(e);
    }
    const tempData = { ...menuItems };
    tempData[clickedRight].title = newTitle;
    setMenuItems(tempData);
    setModalOpen(false);
    setClickedRight(null);
  };

  const modalSubmitAddHandler = async (title) => {
    try {
      const response = await axios.post("http://127.0.0.1:3001/menu", {
        title: title,
        parentId: clickedRight,
      });
      const newItem = response.data.newItem;
      const prevMenu = { ...menuItems };
      prevMenu[newItem.id] = newItem;
      if (prevMenu[newItem.parent].children === null) {
        prevMenu[newItem.parent].children = [newItem.id];
      } else {
        prevMenu[newItem.parent].children.push(newItem.id);
      }
      setMenuItems(prevMenu);
      console.log(newItem);
      setModalOpen(false);
      setClickedRight(null);
    } catch (e) {
      console.log(e);
    }
  };

  const deleteHandler = async () => {
    try {
      const response = await axios.delete(
        `http://127.0.0.1:3001/menu/${clickedRight}`
      );
      const menu = response.data.menu;
      setMenuItems(menu);
    } catch (e) {
      console.log(e);
    }
  };

  if (menuItems == null) {
    return <div>Loading...</div>;
  }

  return (
    <Fragment>
      <div className={classes["nav-area"]} ref={ref}>
        <div className={classes["menu-name"]}>{props.name}</div>
        <div className={classes.menu}>
          <MenuItem
            item={menuItems[firstItem]}
            depthLevel={0}
            handleDropdownClick={handleDropdownClick}
            dropdownItem={dropdownItem}
            handleContextClick={handleContextClick}
            jsonData={menuItems}
            modalOpenHandler={modalOpenHandler}
            closeContextMenu={() => setContextMenuVisible(false)}
          />
        </div>
      </div>
      {contextMenuVisible && clickedRight && (
        <RightClickMenu
          points={points}
          modalOpenHandler={modalOpenHandler}
          closeContext={() => setContextMenuVisible(false)}
          deleteHandler={deleteHandler}
        />
      )}
      {modalOpen && (
        <Modal
          modalCloseHandler={modalCloseHandler}
          action={modalAction}
          modalSubmitEditHandler={modalSubmitEditHandler}
          modalSubmitAddHandler={modalSubmitAddHandler}
        />
      )}
    </Fragment>
  );
};

export default Menu;
