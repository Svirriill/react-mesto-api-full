const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/users');
const BadRequestError = require('../errors/BadRequestError');
const NotFoundError = require('../errors/NotFoundError');
const ConflictError = require('../errors/ConflictError');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports.createUser = (req, res, next) => {
  const {
    name,
    about,
    avatar,
    email,
    password,
  } = req.body;
  if (!email || !password) {
    throw new BadRequestError({ message: 'Не переданы данные' });
  }
  User.findOne({ email })
    .then((admin) => {
      if (admin) {
        throw new ConflictError({ message: 'Пользователь с таким email уже существует' });
      }
      bcrypt.hash(password, 10)
        .then((hash) => User.create({
          name,
          about,
          avatar,
          email: req.body.email,
          password: hash,
        }))
        .then((user) => {
          res.status(201).send({
            data: {
              name: user.name,
              about: user.about,
              avatar: user.avatar,
              email: user.email,
            },
          });
        })
        .catch(next);
    })
    .catch(next);
};

module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((user) => res.send({ data: user }))
    .catch(next);
};

module.exports.getUser = (req, res, next) => {
  User.findById(req.params._id)
    .orFail(new NotFoundError('Нет пользователя с таким id'))
    .then((user) => {
      res.status(200).send(user);
    })
    .catch(next);
};

module.exports.getCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
    .orFail(new NotFoundError('Нет пользователя с таким id'))
    .then((user) => res.send(user))
    .catch(next);
};

module.exports.updateProfile = (req, res, next) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    {
      new: true,
      runValidators: true,
      upsert: true,
    },
  )
    .orFail(() => new NotFoundError({ message: 'Нет пользователя с таким id' }))
    .catch((err) => {
      if (err instanceof NotFoundError) {
        throw err;
      }
      throw new BadRequestError({ message: 'Указаны некорректные данные' });
    })
    .then((user) => {
      res.send(user);
    })
    .catch(next);
};

module.exports.updateAvatar = (req, res, next) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    {
      new: true,
      runValidators: true,
      upsert: true,
    },
  )
    .orFail(() => new NotFoundError({ message: 'Нет пользователя с таким id' }))
    .catch((err) => {
      if (err instanceof NotFoundError) {
        throw err;
      }
      throw new BadRequestError({ message: 'Указаны некорректные данные' });
    })
    .then((user) => res.send(user))
    .catch(next);
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
        { expiresIn: '7d' },
      );
      res.send({ token });
    })
    .catch(next);
};
