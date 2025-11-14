const express = require("express");
const router = express.Router();
const dummy = require("../data/dummydata");
const inputValidation = require("../validator/inputValidation");
const {
  validateShoppingListCreate,
  validateShoppingListGet,
  validateShoppingListUpdate,
  validateShoppingListRemove,
  validateShoppingListAddMember,
  validateShoppingListRemoveMember,
  validateShoppingListAddItem,
  validateShoppingListRemoveItem,
} = require("../validator/shopping-lists");

const {
  handlerCreateList,
  handlerGetShoppingLists,
  handlerGetShoppingList,
  handlerUpdateList,
  handlerRemoveList,
  handlerAddMember,
  handlerRemoveMember,
  handlerAddItem,
  handlerRemoveItem,
} = require("../controllers/shopping-lists");

//shows all shopping lists
router.get("/", handlerGetShoppingLists);
//shopping-list/:id
router.get("/:id", validateShoppingListGet, inputValidation, handlerGetShoppingList);
//shopping-list/create
router.post("/create", validateShoppingListCreate, inputValidation, handlerCreateList);
//shopping-list/update
router.put("/update/:id", validateShoppingListUpdate, inputValidation, handlerUpdateList);
//shopping-list/remove/:id
router.delete("/remove/:id", validateShoppingListRemove, inputValidation, handlerRemoveList);
//shopping-list/addMember/:id
router.put("/addMember/:id", validateShoppingListAddMember, inputValidation, handlerAddMember);
//shopping-list/removeMember/:id
router.put("/removeMember/:id", validateShoppingListRemoveMember, inputValidation, handlerRemoveMember);
//shopping-list/addItem
router.put("/addItem", validateShoppingListAddItem, inputValidation, handlerAddItem);
//shopping-list/removeItem/:id
router.put("/removeItem/:id", validateShoppingListRemoveItem, inputValidation, handlerRemoveItem);


router.put("/:id", async (req, res) => {
  try {
    validateShoppingList.validateShoppingListUpdate(req.body);
  } catch (e) {
    return res.status(400).json({ error: e.message || "Invalid payload" });
  }

  dummy.shoppingLists = dummy.shoppingLists || [];
  const idx = dummy.shoppingLists.findIndex((i) => i.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: "Not found" });

  const updated = Object.assign({}, dummy.shoppingLists[idx], req.body, {
    updatedAt: new Date().toISOString(),
  });
  dummy.shoppingLists[idx] = updated;
  res.json(updated);
});

router.delete("/:id", (req, res) => {
  dummy.shoppingLists = dummy.shoppingLists || [];
  const idx = dummy.shoppingLists.findIndex((i) => i.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: "Not found" });
  dummy.shoppingLists.splice(idx, 1);
  res.status(204).send();
});

module.exports = router;
