const { Router } = require('express');
const { check } = require('express-validator');
const { transferAmount } = require('../controllers/transfer.controllers');
const { validateFields } = require('../middlewares/validateField.middleware');

const router = Router();

router.post(
  '/',
  [
    check('amount', 'Amount is require').not().isEmpty(),
    check('accountNumber', 'AccountNumber is require').not().isEmpty(),
    check('senderUserAccount', 'SenderUserAccount is require').not().isEmpty(),
    validateFields,
  ],
  transferAmount
);

module.exports = {
  transferRouter: router,
};
