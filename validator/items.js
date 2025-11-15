const { body, param } = require("express-validator");

exports.validateItemGet = [
  param("id")
    .notEmpty()
    .withMessage("itemId is required")
    .isString()
    .withMessage("Invalid id"),
];

exports.validateItemAdd = [
  param("listId")
    .notEmpty()
    .withMessage("listId is required")
    .isString()
    .withMessage("listId must be a string"),
  body("name")
    .notEmpty()
    .withMessage("Name is required")
    .isString()
    .withMessage("Name must be a string")
    .isLength({ max: 50 })
    .withMessage("Name can be at most 50 characters long"),
];

exports.validateItemRemove = [
  param("listId")
    .notEmpty()
    .withMessage("listId is required")
    .isString()
    .withMessage("listId must be a string"),
  body("itemId")
    .notEmpty()
    .withMessage("itemId is required")
    .isString()
    .withMessage("itemId must be a string"),
];

exports.validateItemUpdate = [
  param("id")
    .notEmpty()
    .withMessage("Item Id is required")
    .isString()
    .withMessage("itemId must be a string"),
  body("name")
    .notEmpty()
    .withMessage("Name is required")
    .isString()
    .withMessage("Name must be a string")
    .isLength({ max: 50 })
    .withMessage("Name can be at most 50 characters long"),
];

exports.validateItemCheck = [
  param("id")
    .notEmpty()
    .withMessage("Item Id is required")
    .isString()
    .withMessage("itemId must be a string"),
  body("isChecked")
    .isBoolean()
    .withMessage("Checked must be a boolean")
    .notEmpty()
    .withMessage("Checked is required"),
];