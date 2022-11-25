import React, { useState, ReactElement, Fragment } from 'react';
import { Box, Modal, Grid, Button } from '@mui/material';
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
  const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    minWidth: 320,
    bgcolor: 'background.paper',
    border: '2px solid #eee',
    boxShadow: 2,
    pt: 2,
    px: 4,
    pb: 3,
  };

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
        <Box sx={{ ...style }}>
          <div className="modal-form">
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
        </Box>
      </Modal>
    </Fragment>
  );
};

export default ModalForm;