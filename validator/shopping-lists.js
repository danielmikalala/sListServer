const { body, param } = require("express-validator");

exports.validateShoppingListGet = [
  param("id")
    .notEmpty()
    .withMessage("listId is required")
    .isInt()
    .withMessage("Invalid id"),
];

exports.validateShoppingListCreate = [
  body("name")
    .notEmpty()
    .withMessage("Name is required")
    .isString()
    .withMessage("Name must be a string")
    .isLength({ max: 80 })
    .withMessage("Name can be at most 80 characters long"),
];

exports.validateShoppingListUpdate = [
  param("id")
    .notEmpty()
    .withMessage("listId is required")
    .isInt()
    .withMessage("Invalid id"),
  body("name")
    .notEmpty()
    .withMessage("Name is required")
    .isString()
    .withMessage("Name must be a string")
    .isLength({ max: 80 })
    .withMessage("Name can be at most 80 characters long"),
  body("isArchived")
    .notEmpty()
    .withMessage("isArchived is required")
    .isBoolean()
    .withMessage("isArchived must be a boolean"),
];

exports.validateShoppingListRemove = [
  param("id")
    .notEmpty()
    .withMessage("listId is required")
    .isInt()
    .withMessage("Invalid id"),
];

exports.validateShoppingListAddMember = [
  param("id")
    .notEmpty()
    .withMessage("listId is required")
    .isInt()
    .withMessage("Invalid id"),
  body("userId")
    .notEmpty()
    .withMessage("userId is required")
    .isInt()
    .withMessage("userId must be a number"),
];

exports.validateShoppingListRemoveMember = [
  param("id")
    .notEmpty()
    .withMessage("listId is required")
    .isInt()
    .withMessage("Invalid id"),
  body("userId")
    .notEmpty()
    .withMessage("userId is required")
    .isString()
    .withMessage("userId must be a string"),
];

exports.validateShoppingListAddItem = [
  param("id")
    .notEmpty()
    .withMessage("listId is required")
    .isInt()
    .withMessage("Invalid id"),
  body("itemId")
    .notEmpty()
    .withMessage("itemId is required")
    .isInt()
    .withMessage("itemId must be a number"),
];

exports.validateShoppingListRemoveItem = [
  param("id")
    .notEmpty()
    .withMessage("listId is required")
    .isInt()
    .withMessage("Invalid id"),
  body("itemId")
    .notEmpty()
    .withMessage("itemId is required")
    .isInt()
    .withMessage("itemId must be a number"),
];
