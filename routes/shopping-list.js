const express = require("express");
const router = express.Router();
const dummy = require("../data/dummydata");
const inputValidation = require("../validator/inputValidation");
const {
  validateShoppingListCreate,
  validateShoppingListGet,
  validateShoppingListUpdate,
  validateShoppingListDelete,
  validateShoppingListAddMember,
  validateShoppingListRemoveMember
} = require("../validator/shopping-lists");

const {
  handlerCreateList,
  handlerGetShoppingLists,
  handlerGetShoppingList,
  handlerUpdateList,
  handlerDeleteList,
  handlerAddMember,
  handlerRemoveMember
} = require("../controllers/shopping-lists");

//shows all shopping lists
router.get("/", handlerGetShoppingLists);
//shopping-list/:id
router.get("/:id", validateShoppingListGet, inputValidation, handlerGetShoppingList);
//shopping-list/create
router.post("/create", validateShoppingListCreate, inputValidation, handlerCreateList);
//shopping-list/update
router.put("/update/:id", validateShoppingListUpdate, inputValidation, handlerUpdateList);
//shopping-list/delete/:id
router.delete("/delete/:id", validateShoppingListDelete, inputValidation, handlerDeleteList);
//shopping-list/addMember/:id
router.put("/addMember/:id", validateShoppingListAddMember, inputValidation, handlerAddMember);
//shopping-list/removeMember/:id
router.put("/removeMember/:id", validateShoppingListRemoveMember, inputValidation, handlerRemoveMember);

module.exports = router;
