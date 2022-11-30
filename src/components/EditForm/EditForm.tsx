import React, { useState } from 'react';
import { Props } from './interfaces';
import { Button } from '@mui/material';
import './EditForm.scss';

const EditForm = ({ buttonText, contentEdit, contentMain, saved, deleted }: Props) => {
  const [editMain, setEditMain] = useState(false);

  return (
    <div className="edit-form">
      <div className="edit-form__content">
        {editMain ? (
          <form>
            {contentEdit}
            <div className="edit-form__buttons">
              <Button onClick={() => setEditMain(false)}>Отменить</Button>
              <Button
                type="submit"
                onClick={() => {
                  saved();
                  setEditMain(false);
                }}
              >
                Сохранить
              </Button>
            </div>
          </form>
        ) : (
          <div className="edit-form__line">
            <div>{contentMain}</div>
            <Button onClick={() => setEditMain(true)}>{buttonText}</Button>
            {deleted ? <Button onClick={() => deleted()}>X</Button> : null}
          </div>
        )}
      </div>
    </div>
  );
};

export default EditForm;
