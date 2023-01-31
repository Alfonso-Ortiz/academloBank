const { response } = require('express');
const AppError = require('../helpers/appError');
const Transfer = require('../models/transfer.model');
const User = require('../models/user.model');

exports.transferAmount = async (req, res = response, next) => {
  // 1. recibimos el amount, accountNumber, senderUserAccount
  const { amount, accountNumber, senderUserAccount } = req.body;

  // 2. buscamos el usuario que va a recibir la transferencia donde el status sea tru y corresponda el número de cuenta
  const userReceiver = await User.findOne({
    where: {
      status: 'enabled',
      accountNumber: accountNumber,
    },
  });

  // validamos que la cuenta que va a recibir la transferencia exista
  if (!userReceiver) {
    return next(new AppError('Account was not found', 404));
  }

  // 3. obtenemos el id del usuario que recibe
  const reciverUserAccount = userReceiver.accountNumber;

  // 4. buscamos al usuario que va a hacer la transferencia
  const userSendTransfer = await User.findOne({
    where: {
      status: 'enabled',
      accountNumber: senderUserAccount,
    },
  });

  // 5. verificar si el monto a transferir es mayor al monto que tiene en usuario
  if (amount > userSendTransfer.amount) {
    return next(new AppError('Insufficients founds', 400));
  }

  // 6. verificar si el id del usuario que recibe es igual al id del usuario que envía
  if (reciverUserAccount === senderUserAccount) {
    return next(new AppError('You can not send money to yourself', 400));
  }

  // 7. constante que se llame newAmountUserSendTransfer dónde se guardara el monto que tiene el usuario
  // menos el monto que se recibe en la req.body
  const newAmountUserSendTransfer = userSendTransfer.amount - amount;

  // 8. constante que se llame newAmountUserReciverTransfer dónde se guardará el monto que tiene el usuario en
  // userReceiver.amount  más el monto que recibe en la req.body
  const newAmountUserReciverTransfer = userReceiver.amount + amount;

  // 9. actualizamos la información del usuario que envía en la base de datos
  await userSendTransfer.update({ amount: newAmountUserSendTransfer });

  // 10. actualizamos la información del usuario que recibe en la base de datos
  await userReceiver.update({ amount: newAmountUserReciverTransfer });

  // 11. Guardar o crear la transferencia en la base de datos

  await Transfer.create({
    amount: amount,
    senderUserAccount,
    reciverUserAccount,
  });

  // 12. Enviar respuesta al cliente que diga que la transferencia se hizo exitosamente

  return res.status(200).json({
    status: 'Success',
    message: 'The transfer was successfully',
  });
};
