const express = require('express');
const router = express.Router();
const dummy = require("../data/dummydata");
const inputValidation = require("../validator/inputValidation");
const {
  validateUserGet,
  validateUserRegister,
  validateUserLogin
} = require("../validator/users");

const {
  handlerGetUsers,
  handlerGetUser,
  handlerRegister,
  handlerLogin
} = require("../controllers/users");

//shows all users
router.get('/', handlerGetUsers);
//user/:id
router.get('/:id', validateUserGet, inputValidation, handlerGetUser);
//user/register
router.post('/register', validateUserRegister, inputValidation, handlerRegister);
//user/login
router.post('/login', validateUserLogin, inputValidation, handlerLogin);

module.exports = router;