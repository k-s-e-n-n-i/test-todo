import React, { useState, ReactElement, Fragment } from 'react';
import { Modal, Button } from '@mui/material';
import './ModalForm.scss';

const ModalForm = ({
  textButton,
  content,
  saved,
}: {
  textButton: string;
  content: ReactElement;
  saved: any;
}) => {
  const [open, setOpen] = useState(false);

  return (
    <Fragment>
      <Button onClick={() => setOpen(true)}>{textButton}</Button>

      <Modal
        hideBackdrop
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <div className="modal-form">
          <div className="modal-form__content">
            {content}

            <div className="modal-form__buttons">
              <Button onClick={() => setOpen(false)}>Отменить</Button>
              <Button
                onClick={() => {
                  setOpen(false);
                  saved();
                }}
              >
                Сохранить
              </Button>
            </div>
          </div>
        </div>
      </Modal>
    </Fragment>
  );
};

export default ModalForm;
