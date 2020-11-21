/* eslint-disable consistent-return */
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/users');

module.exports.createUser = (req, res, next) => {
  const {
    email, password,
  } = req.body;

  User.findOne({ email })
    .then((admin) => {
      if (admin) {
        return res.status(409).send({ message: 'Пользователь с таким email уже существует' });
      }
    })
    .catch(next);

  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name: 'Жак-Ив Куссто',
      about: 'Исследователь',
      avatar: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
      email,
      password: hash,
    }))
    .then(({ name, about, avatar }) => res.status(201).send({
      data: {
        name, about, avatar, email,
      },
    }))
    .catch(next);
};

module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((user) => res.send({ data: user }))
    .catch(next);
};

module.exports.getUser = (req, res, next) => {
  User.findById(req.params.id)
    .orFail(new Error('ErrorName'))
    .then((user) => {
      res.status(200).send(user);
    })
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
    .then((user) => res.send({ data: user }))
    .catch(next);
};

module.exports.updateAvatar = (req, res, next) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(
    req.params._id,
    { avatar },
    {
      new: true,
      runValidators: true,
      upsert: true,
    },
  )
    .then((user) => res.send({ data: user }))
    .catch(next);
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        'super-secret',
        { expiresIn: '7d' },
      );
      // res.send({ token });
      res
        .cookie('jwt', token, {
          maxAge: 3600000 * 24 * 7,
          httpOnly: true,
          sameSite: true,
        })
        .send({ message: 'Успешная авторизация' });
    })
    .catch(next);
};
