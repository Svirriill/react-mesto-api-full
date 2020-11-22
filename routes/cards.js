const routesCards = require('express').Router();
const { validateCard, validateId } = require('../middlewares/requestValidation');
const {
  createCard,
  getCards,
  deleteCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');

routesCards.get('/', getCards);
routesCards.post('/', validateCard, createCard);
routesCards.delete('/:id', validateId, deleteCard);
routesCards.put('/:id/likes', validateId, likeCard);
routesCards.delete('/:id/likes', validateId, dislikeCard);

module.exports = routesCards;
