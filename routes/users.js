const usersRouter = require('express').Router();
const { validateId, validateProfileUpdate, validateAvatarUpdate } = require('../middlewares/requestValidation');
const {
  getUsers,
  getUser,
  updateProfile,
  updateAvatar,
} = require('../controllers/users');

usersRouter.get('/', getUsers);
usersRouter.get('/users/_id', validateId, getUser);
usersRouter.patch('/users/me', validateProfileUpdate, updateProfile);
usersRouter.patch('/users/me/avatar', validateAvatarUpdate, updateAvatar);

module.exports = usersRouter;
