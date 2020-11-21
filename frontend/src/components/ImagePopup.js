import React from 'react';
import esc from "../images/Close_Icon.png";
function ImagePopup(props) {
    const { name, link, isOpen, onClose } = props;

    return (
        <section className={`popup ${isOpen && 'popup_opened'}`}>
            <section className="popup__figure popup__figure_form">
                <img className="popup__image popup__image_opened" src={link}
                    alt={name}
                />
                <p className="popup__figcaption">{name}</p>
                <button className="popup__button-esc" type="button">
                    <img src={esc} alt="кнопка закрытия " className="popup__esc popup__esc_image" onClick={onClose}
                    />
                </button>
            </section>
        </section>
    )
}

export default ImagePopup;