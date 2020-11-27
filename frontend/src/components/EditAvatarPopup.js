import React from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup(props) {
    const { isOpen, onClose, onUpdateAvatar, isLoading } = props;
    const inputRef = React.useRef('');


    const [urlError, setUrlError] = React.useState('');
    const [disabled, setDisabled] = React.useState(true);
    const [urlValid, setUrlValid] = React.useState(false);

    React.useEffect(() => {
        setDisabled(true);
        setUrlError('');
        inputRef.current.value = '';
    }, [isOpen]);

    React.useEffect(() => {
        urlValid ? setDisabled(false) : setDisabled(true);
    }, [urlValid, inputRef.current.value]);

    function handleSubmit(evt) {
        evt.preventDefault();
        onUpdateAvatar({ url: inputRef.current.value });
    }

    function validation() {
        setUrlError(inputRef.current.validationMessage);

        !inputRef.current.validity.valid ? setUrlValid(false) : setUrlValid(true);
    }

    return (
        <PopupWithForm
            name='avatar'
            title='Обновить аватар'
            submit='Сохранить'
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
            disabled={disabled}
            isLoading={isLoading}
        >
            <label htmlFor='url' className='popup__field'>
                <input
                    ref={inputRef}
                    onChange={validation}
                    type='url'
                    className='popup__input'
                    id='url'
                    name='url'
                    placeholder='Ссылка на аватар'
                    required
                />
                <span className={`popup__input-error ${!urlValid && 'popup__input-error_active'
                    }`} id='url-error'>{urlError}
                </span>
            </label>
        </PopupWithForm>
    )
}

export default EditAvatarPopup;