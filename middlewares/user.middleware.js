const AppError = require('../helpers/appError');
const User = require('../models/user.model');

exports.accountExists = async (req, res, next) => {
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
    return next(new AppError('User was not found', 404));
  }

  req.user = user;
  next();
};

exports.validUserExists = async (req, res, next) => {
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
    return next(new AppError('User was not found', 404));
  }

  req.user = user;
  next();
};
