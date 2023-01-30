// importamos el modelo creado en models
const Transfer = require('../models/transfer.model');
const User = require('../models/user.model');

// TODO: todos los modelos se ejecutan de modo asincronó, por lo que es importane usar el metodo async - await

//!crear usuario
exports.register = async (req, res = response) => {
  try {
    // obtenemos el nombre y la contraseña de la req.body
    const { name, password } = req.body;

    // generamos el numero de la cuenta de 6 digitos en una variable
    const accountNumber = Math.floor(
      100000 + Math.random() * 900000
    ).toString();

    // el monto debe iniciar en 1000
    const amount = 1000;

    // creamos el usuario con la información recibida
    const newUser = await User.create({
      name: name.toLowerCase(),
      accountNumber: accountNumber,
      password,
      amount: amount,
    });

    // validamos que no se vaya a crear otro usuario con el mismo numero de cuenta
    // if (accountNumber) {
    //   return res.status(400).json({
    //     status: 'Error',
    //     message: 'The account number already exists',
    //   });
    // }

    // enviamos las respuesta
    res.status(200).json({
      status: 'Success',
      message: 'The user has been created successfully',
      newUser,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: 'fail',
      message: 'Internal Server Error',
    });
  }
};

exports.login = async (req, res = response) => {
  try {
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
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: 'fail',
      message: 'Internal Server Error',
    });
  }
};

exports.getHistory = async (req, res = response) => {
  try {
    // importamos el middleware
    const { user } = req;

    // si la busqueda sale bien en el middleware enviamos la respuesta
    res.status(200).json({
      status: 'Sucess',
      message: 'The user has been found successfully',
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: 'fail',
      message: 'Internal Server Error',
    });
  }
};
