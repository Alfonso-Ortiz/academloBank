const { Router } = require('express');
const { check } = require('express-validator');
const {
  register,
  login,
  getHistory,
} = require('../controllers/users.controllers');
const { validUserExists } = require('../middlewares/user.middleware');
const { validateFields } = require('../middlewares/validateField.middleware');

const router = Router();

router.post(
  '/singup',
  [
    check('name', 'Name is require').not().isEmpty(),
    check('password', 'Password is require').not().isEmpty(),
    validateFields,
  ],
  register
);

router.post('/login', login);

router.get('/:accountNumber/history', getHistory);

module.exports = {
  usersRouter: router,
};
