const usersRouter = require('express').Router();
const { validateId, validateProfileUpdate, validateAvatarUpdate } = require('../middlewares/requestValidation');
const {
  getUsers,
  getCurrentUser,
  getUser,
  updateProfile,
  updateAvatar,
} = require('../controllers/users');

usersRouter.get('/', getUsers);
usersRouter.get('/me', getCurrentUser);
usersRouter.get('/:_id', validateId, getUser);
usersRouter.patch('/me', validateProfileUpdate, updateProfile);
usersRouter.patch('/me/avatar', validateAvatarUpdate, updateAvatar);

module.exports = usersRouter;
