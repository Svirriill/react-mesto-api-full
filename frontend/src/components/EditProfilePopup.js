import React from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function EditProfilePopup(props) {
  const { isOpen, onClose, onUpdateUser, isLoading } = props;
  const currentUser = React.useContext(CurrentUserContext);

  const nameRef = React.useRef();
  const descriptionRef = React.useRef();

  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [nameError, setNameError] = React.useState('');
  const [descriptionError, setDescriptionError] = React.useState('');
  const [nameValid, setNameValid] = React.useState(false);
  const [descriptionValid, setDescriptionValid] = React.useState(false);
  const [disabled, setDisabled] = React.useState(true);

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]);

  React.useEffect(() => {
    setDisabled(true);
    setNameError('');
    setDescriptionError('');
  }, [isOpen]);

  React.useEffect(() => {
    nameValid && descriptionValid ? setDisabled(false) : setDisabled(true);
  }, [nameValid, descriptionValid, name, description]);

  function handleChange(evt) {
    evt.target.name === 'name'
      ? setName(evt.target.value)
      : setDescription(evt.target.value);

      validation();
  }

  function validation() {
    setNameError(nameRef.current.validationMessage);
    setDescriptionError(descriptionRef.current.validationMessage);

    !nameRef.current.validity.valid ? setNameValid(false) : setNameValid(true);
    !descriptionRef.current.validity.valid
      ? setDescriptionValid(false)
      : setDescriptionValid(true);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    onUpdateUser({
      name: name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      formName='user'
      title='Редактировать профиль'
      submit='Сохранить'
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      disabled={disabled}
      isLoading={isLoading}
    >
      <label htmlFor='name' className='popup__field'>
        <input
          ref={nameRef}
          type='text'
          className='popup__input'
          id='name'
          name='name'
          value={name || ''}
          placeholder='Имя'
          minLength='2'
          maxLength='40'
          pattern='[А-Яа-яA-Za-z -]{1,}'
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
      <label htmlFor='about' className='popup__field'>
        <input
          ref={descriptionRef}
          type='text'
          className='popup__input'
          id='about'
          name='about'
          value={description || ''}
          placeholder='О себе'
          minLength='2'
          maxLength='200'
          required
          onChange={handleChange}
        />
        <span
          className={`popup__input-error ${!descriptionValid && 'popup__input-error_active'
            }`}
          id='about-error'
        >
          {descriptionError}
        </span>
      </label>
    </PopupWithForm>
  );
}

export default EditProfilePopup;