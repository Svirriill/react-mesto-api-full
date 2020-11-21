const routesCards = require('express').Router();
const {
  createCard,
  getCards,
  deleteCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');

routesCards.post('/', createCard);
routesCards.get('/', getCards);
routesCards.delete('/:id', deleteCard);
routesCards.put('/:id/likes', likeCard);
routesCards.delete('/:id/likes', dislikeCard);

module.exports = routesCards;
