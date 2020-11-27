import React from 'react';
import enterImage from '../images/Union_1.png';
import errorImage from '../images/Union_2.png';
import esc from "../images/Close_Icon.png";

function InfoTooltip(props) {
    const { loggedIn, isOpen, onClose } = props;
    const [text, setText] = React.useState('');
    const [image, setImage] = React.useState('');

    React.useEffect(() => {
        if (loggedIn) {
            setText('Вы успешно зарегистрировались!')
            setImage(enterImage);
        } else {
            setText('Что-то пошло не так! Попробуйте ещё раз.')
            setImage(errorImage);
        }
    }, [isOpen, loggedIn]);

    return (
        <section className={`popup popup_tooltip ${isOpen && "popup_opened"}`}>
            <div className="popup__container">
                <form className="popup__form" action="#">
                    <div className="popup__message">
                        <img className="popup__image-enter" src={image} alt="знак входа/ошибки" />
                        <h3 className="popup__title-enter">{text}</h3>
                    </div>
                    <button className="popup__button-esc" type="button">
                        <img src={esc} alt="кнопка закрытия окна редиктирования" onClick={onClose}
                            className="popup__esc" />
                    </button>
                </form>
            </div>
        </section>
    )
}
export default InfoTooltip;