import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const { card, onCardClick, onCardLike, onCardDelete } = props;
  const isOwn = card.owner === currentUser._id;
  const cardDeleteButtonClassName = `element__delete ${isOwn && 'element__delete_active'
    }`;
  const isLiked = card.likes.some((i) => i === currentUser._id);
  const cardLikeButtonClassName = `element__like ${isLiked && 'element__like_active'
    }`;

  function handleClick() {
    onCardClick(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleDeleteClick() {
    onCardDelete(card);
  }

  return (
    <li className="element">
      <img className="element__image" src={card.link}
        alt={card.name} onClick={handleClick} />
      <button className={cardDeleteButtonClassName} type="button" onClick={handleDeleteClick}></button>
      <div className="element__text">
        <h3 className="element__title">{card.name}</h3>
        <div className="element__like-container">
          <button className={cardLikeButtonClassName} onClick={handleLikeClick}></button>
          <div className="element__like-number">{card.likes.length}</div>
        </div>
      </div>
    </li>
  );
}

export default Card;
