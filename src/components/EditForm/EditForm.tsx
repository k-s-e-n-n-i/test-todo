import React, { ReactElement, Fragment, useState } from 'react';
import { Button } from '@mui/material';
import './EditForm.scss';

const EditForm = ({
  buttonText,
  contentEdit,
  contentMain,
  saved,
}: {
  buttonText: string;
  contentEdit: ReactElement;
  contentMain: ReactElement | null;
  saved: any;
}) => {
  const [editMain, setEditMain] = useState(false);

  return (
    <div className="edit-form">
      <div className="edit-form__content">
        {editMain ? (
          <Fragment>
            {contentEdit}
            <div className="edit-form__buttons">
              <Button onClick={() => setEditMain(false)}>Отменить</Button>
              <Button
                onClick={() => {
                  saved();
                }}
              >
                Сохранить
              </Button>
            </div>
          </Fragment>
        ) : (
          <Fragment>
            {contentMain}
            <Button onClick={() => setEditMain(true)} style={{ marginTop: '10px' }}>
              {buttonText}
            </Button>
          </Fragment>
        )}
      </div>
    </div>
  );
};

export default EditForm;
