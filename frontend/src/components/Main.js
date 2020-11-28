import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext'
import Card from './Card';
import edit from "../images/Edit_Button.svg";
import add from "../images/Vector_button.svg";

function Main(props) {
  const currentUser = React.useContext(CurrentUserContext);

  const {
    onEditAvatar,
    onEditProfile,
    onAddPlace,
    onCardClick,
    cards,
    onCardLike,
    onCardDelete,
  } = props;


  return (
    <div className="main">
      <section className="profile">
        <div className="profile__image-container" onClick={onEditAvatar} >
          <img className="profile__image" src={currentUser.avatar}
            alt="Аватар" />
        </div>

        <div className="profile__info">
          <h1 className="profile__title">{currentUser.name}</h1>
          <img className="profile__button-edit" src={edit} alt="редактирование кнопки" onClick={onEditProfile}
          />
          <h3 className="profile__subtitle">{currentUser.about}</h3>
        </div>
        <button className="profile__button" type="button" onClick={onAddPlace}>
          <img src={add} alt="кнопка '+'" />
        </button>
      </section>
      <ul className="elements">
        { (cards.length > 0) && cards.map((card) => (
          <Card key={card._id} card={card} onCardClick={onCardClick} onCardLike={onCardLike} onCardDelete={onCardDelete} />
        ))}
      </ul>
    </div>
  );
}
export default Main;