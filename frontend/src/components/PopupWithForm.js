import React from 'react'
import esc from "../images/Close_Icon.png";
function PopupWithForm(props) {
  const { name, isOpen, title, children, submit, onClose, onSubmit, disabled, isLoading, } = props;

  return (
    <section className={`popup popup_${name} ${isOpen && 'popup_opened'
      }`}>
      <div className="popup__container">
        <h3 className="popup__title">{title}</h3>
        <form className={`popup__form popup__form_${name}`} action="#" onSubmit={onSubmit}>
          {children}
          <button className={`popup__button ${disabled && 'popup__button_inactive'
      }`} type="submit" disabled={disabled}>{isLoading ? `Сохранение...` : submit}</button>
          <button className="popup__button-esc" type="button">
            <img src={esc} alt="кнопка закрытия окна редиктирования" onClick={onClose}
              className="popup__esc" />
          </button>
        </form>
      </div>
    </section>
  )
}

export default PopupWithForm;