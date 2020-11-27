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
routesCards.delete('/:_id', validateId, deleteCard);
routesCards.put('/likes/:_id', validateId, likeCard);
routesCards.delete('/likes/:_id', validateId, dislikeCard);

module.exports = routesCards;
