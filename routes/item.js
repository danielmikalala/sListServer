const express = require("express");
const router = express.Router();
const dummy = require("../data/dummydata");
const inputValidation = require("../validator/inputValidation");
const {
  validateItemGet,
  validateItemAdd,
  validateItemRemove,
  validateItemUpdate,
  validateItemCheck
} = require("../validator/items");

const {
  handlerGetItems,
  handlerGetItem,
  handlerAddItem,
  handlerRemoveItem,
  handlerUpdateItem,
  handlerCheckItem
} = require("../controllers/items");


//shows all items
router.get("/", handlerGetItems);
//items/:id
router.get("/:id", validateItemGet, inputValidation, handlerGetItem);
//item/add/:listId
router.post("/add/:listId", validateItemAdd, inputValidation, handlerAddItem);
//item/remove/:listId
router.put("/remove/:listId", validateItemRemove, inputValidation, handlerRemoveItem);
//item/update/:id
router.put("/update/:id", validateItemUpdate, inputValidation, handlerUpdateItem);
//item/check/:id
router.put("/check/:id", validateItemCheck, inputValidation, handlerCheckItem);

module.exports = router;