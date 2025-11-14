const express = require("express");
const router = express.Router();
const dummy = require("../data/dummydata");
const inputValidation = require("../validator/inputValidation");
const {
  validateItemCreate,
  validateItemDelete,
  validateItemUpdate,
  validateItemState,
  validateItemGet
} = require("../validator/items");

const {
  handlerCreateItem,
  handlerDeleteItem,
  handlerUpdateItem,
  handlerChangeState,
  handlerGetItem,
  handlerGetItems
} = require("../controllers/items");