import React from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup(props) {
    const { isOpen, onClose, onAddPlace, isLoading } = props;

    const nameRef = React.useRef();
    const linkRef = React.useRef();

    const [name, setName] = React.useState('');
    const [link, setLink] = React.useState('');
    const [nameError, setNameError] = React.useState('');
    const [linkError, setLinkError] = React.useState('');
    const [nameValid, setNameValid] = React.useState(false);
    const [linkValid, setLinkValid] = React.useState(false);
    const [disabled, setDisabled] = React.useState(true);

    React.useEffect(() => {
        setDisabled(true);
        setNameError('');
        setLinkError('');
        setName('');
        setLink('');
    }, [isOpen]);

    React.useEffect(() => {
        nameValid && linkValid ? setDisabled(false) : setDisabled(true);
    }, [nameValid, linkValid, name, link]);

    function handleChange(evt) {
        evt.target.name === 'name'
            ? setName(evt.target.value)
            : setLink(evt.target.value);

        validation();
    }

    function validation() {
        setNameError(nameRef.current.validationMessage);
        setLinkError(linkRef.current.validationMessage);

        !nameRef.current.validity.valid ? setNameValid(false) : setNameValid(true);
        !linkRef.current.validity.valid ? setLinkValid(false) : setLinkValid(true);
    }

    function handleSubmit(evt) {
        evt.preventDefault();
        onAddPlace({
            name,
            link,
        });
    }

    return (
        <PopupWithForm
            name='photo'
            title='Новое место'
            submit='Создать'
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
            disabled={disabled}
            isLoading={isLoading}
        >
            <label htmlFor='name' className='popup__field'>
                <input
                    className='popup__input'
                    ref={nameRef}
                    id='name'
                    name='name'
                    value={name || ''}
                    placeholder='Название'
                    minLength='1'
                    maxLength='30'
                    required
                    onChange={handleChange}
                />
                <span
                    className={`popup__input-error ${!nameValid && 'popup__input-error_active'
                        }`}
                    id='name-error'
                >
                    {nameError}
                </span>
            </label>
            <label htmlFor='link' className='popup__field'>
                <input
                    type='url'
                    className='popup__input'
                    ref={linkRef}
                    id='link'
                    name='link'
                    value={link || ''}
                    placeholder='Ссылка на картинку'
                    required
                    onChange={handleChange}
                />
                <span
                    className={`popup__input-error ${!nameValid && 'popup__input-error_active'
                        }`}
                    id='name-error'
                >
                    {linkError}
                </span>
            </label>
        </PopupWithForm>
    )
}

export default AddPlacePopup;