const express = require("express");
const router = new express.Router();

let currentId = 30;
const menu = require("../db/DATA.json");

// helper functions
const saveMenu = () => {};
const deleterHandlerRecursionAux = (id) => {
  const toBeDeleted = menu[id];
  if (toBeDeleted.children) {
    toBeDeleted.children.forEach((child) => {
      deleterHandlerRecursionAux(child, menu);
    });
  }
  if (toBeDeleted.parent) {
    const parentId = toBeDeleted.parent;
    filteredChildren = menu[parentId].children.filter(
      (childId) => childId != id
    );
    menu[parentId].children = filteredChildren;
    if (menu[parentId].children.length === 0) {
      menu[parentId].children = null;
    }
  }
  delete menu[id];
};

router.get("/menu", async (req, res) => {
  res.status(200).send(menu);
});

router.patch("/menu/:id", async (req, res) => {
  menu[req.params.id].title = req.body.newTitle;
  res.send();
});

router.post("/menu/", async (req, res) => {
  const title = req.body.title;
  const parent = req.body.parentId;
  id = currentId;
  if (menu[parent].children === null) {
    menu[parent].children = [id];
  } else {
    menu[parent].children.push(id);
  }
  const newItem = {
    id: id,
    parent: parent,
    children: null,
    title: title,
  };
  menu[id] = newItem;
  currentId++;
  res.status(201).send({ newItem });
});

router.delete("/menu/:id", async (req, res) => {
  deleterHandlerRecursionAux(req.params.id);
  res.send({ menu });
});

module.exports = router;
