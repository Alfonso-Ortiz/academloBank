const User = require('../models/user.model');

exports.accountExists = async (req, res, next) => {
  try {
    // recibimos el numero de cuenta por parametros
    const { accountNumber, password } = req.params;

    // buscamos el usuario donde el status sea true y que corresponda al número de cuenta
    const user = await User.findOne({
      where: {
        status: true,
        accountNumber: accountNumber,
        password: password,
      },
    });

    // si usuario es null o no existe enviamos el error
    if (!user) {
      return res.status(404).json({
        status: 'Error',
        message: 'The user has not been found',
      });
    }

    req.user = user;
    next();
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: 'fail',
      message: 'Internal Server Error',
    });
  }
};

exports.validUserExists = async (req, res, next) => {
  try {
    // !1. RECIBIMOS EL ID PASADO POR PARAMETROS
    const { accountNumber } = req.params;

    // !2. BUSCAMOS EL USUARIO CON DICHO ID Y QUE SU STATUS SEA TRUE
    const user = await User.findAll({
      where: {
        accountNumber,
        status: 'enabled',
      },
    });

    // !3. SI EL ID ES NULL O NO EXISTE ENVIAMOS ESTE ERROR
    if (!user) {
      return res.status(404).json({
        status: 'error',
        message: 'The user was not found',
      });
    }

    req.user = user;
    next();
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: 'fail',
      message: 'Internal Server Error',
    });
  }
};
