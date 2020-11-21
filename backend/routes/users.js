const usersRouter = require('express').Router();
const {
  getUsers,
  getUser,
  updateProfile,
  updateAvatar,
} = require('../controllers/users');

usersRouter.get('/', getUsers);
usersRouter.get('/:_id', getUser);
usersRouter.patch('/users/me', updateProfile);
usersRouter.patch('/users/me/avatar', updateAvatar);

module.exports = usersRouter;
