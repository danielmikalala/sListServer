const { body, param } = require("express-validator");

exports.validateItemCreate = [
  body("name")
    .notEmpty()
    .withMessage("Name is required")
    .isString()
    .withMessage("Name must be a string")
    .isLength({ max: 80 })
    .withMessage("Name can be at most 80 characters long"),
];

exports.validateItemDelete = [
  body("itemId")
    .notEmpty()
    .withMessage("itemId is required")
    .custom((value) => mongoose.Types.ObjectId.isValid(value))
    .withMessage("itemId must be a number"),
];

exports.validateItemUpdate = [
  body("itemId")
    .notEmpty()
    .withMessage("Item Id is required")
    .custom((value) => mongoose.Types.ObjectId.isValid(value))
    .withMessage("itemId must be a number"),
  body("name")
    .notEmpty()
    .withMessage("Name is required")
    .isString()
    .withMessage("Name must be a string")
    .isLength({ max: 80 })
    .withMessage("Name can be at most 80 characters long"),
];

exports.validateItemState = [
  body("itemId")
    .notEmpty()
    .withMessage("Item Id is required")
    .custom((value) => mongoose.Types.ObjectId.isValid(value))
    .withMessage("itemId must be a number"),
  body("state")
    .isBoolean()
    .withMessage("State must be a boolean")
    .notEmpty()
    .withMessage("State is required"),
];

exports.validateItemGet = [
  param("id")
    .notEmpty()
    .withMessage("itemId is required")
    .isInt()
    .withMessage("Invalid id"),
];
