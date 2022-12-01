import React from 'react';
import { Props } from './interfaces';
import './AddForm.scss';

const AddForm = ({ content, saved, canceled }: Props) => {
  return (
    <form className="add-form">
      {content}
      <div className="add-form__buttons">
        <button className="my-button" onClick={() => canceled()}>
          Отменить
        </button>
        <button
          className="my-button"
          type="submit"
          onClick={(e) => {
            e.preventDefault();
            saved();
          }}
        >
          Сохранить
        </button>
      </div>
    </form>
  );
};

export default AddForm;
