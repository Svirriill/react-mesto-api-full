import React from 'react';
import PopupWithForm from './PopupWithForm';

function ConfirmDelete(props) {
  const { isOpen, onClose, onConfirmDelete, isLoading } = props;

  function handleSubmit(evt) {
    evt.preventDefault();
    onConfirmDelete();
  }

  return (
    <PopupWithForm
      formName='delete'
      title='Вы уверены?'
      submit='Да'
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isLoading={isLoading}
    ></PopupWithForm>
  );
}

export default ConfirmDelete;