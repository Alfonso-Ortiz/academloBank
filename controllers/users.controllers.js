// importamos el modelo creado en models
const Transfer = require('../models/transfer.model');
const User = require('../models/user.model');
const catchAsync = require('../helpers/catchAsync');

// TODO: todos los modelos se ejecutan de modo asincronó, por lo que es importane usar el metodo async - await

//!crear usuario
exports.register = catchAsync(async (req, res = response) => {
  // obtenemos el nombre y la contraseña de la req.body
  const { name, password } = req.body;

  // generamos el numero de la cuenta de 6 digitos en una variable
  const accountNumber = Math.floor(100000 + Math.random() * 900000).toString();

  // el monto debe iniciar en 1000
  const amount = 1000;

  // creamos el usuario con la información recibida
  const newUser = await User.create({
    name: name.toLowerCase(),
    accountNumber: accountNumber,
    password,
    amount: amount,
  });

  // enviamos las respuesta
  res.status(200).json({
    status: 'Success',
    message: 'The user has been created successfully',
    newUser,
  });
});

exports.login = catchAsync(async (req, res = response, next) => {
  // el usuario ingresa su número de cuenta y contraseña
  const { accountNumber, password } = req.body;

  // importamos el middleware
  const { user } = req;

  // enviamos la respuesta
  return res.status(200).json({
    status: 'Success',
    message: 'You have successfully logged in',
    user,
    accountNumber,
    password,
  });
});

exports.getHistory = catchAsync(async (req, res = response) => {
  const { accountNumber } = req.params;

  const getHistory = await Transfer.findAll({
    where: {
      senderUserAccount: accountNumber,
    },
  });

  return res.status(200).json({
    status: 'sucess',
    message: 'The history has been found successfully',
    getHistory,
  });
});
