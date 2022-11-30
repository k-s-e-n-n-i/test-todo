import React, { Fragment } from 'react';
import { Props } from './interfaces';
import { Button } from '@mui/material';
import './ModalForm.scss';
import WithStore from '../../redux/hoc/WithStore';
import { connect } from 'react-redux';
import { MapStateToProps } from '../../redux/services/MapStateToProps';
import { MapDispatchToProps } from '../../redux/services/MapDispatchToProps';

const ModalForm = ({ textButton, content, saved, modal, modalUpdated, id }: Props) => {
  return (
    <Fragment>
      <Button onClick={() => modalUpdated(id)}>{textButton}</Button>

      {modal === id ? (
        <form className="modal-form">
          <div className="modal-form__content">
            {content}

            <div className="modal-form__buttons">
              <Button onClick={() => modalUpdated('')}>Отменить</Button>
              <Button
                type="submit"
                onClick={() => {
                  modalUpdated('');
                  saved();
                }}
              >
                Сохранить
              </Button>
            </div>
          </div>
        </form>
      ) : null}
    </Fragment>
  );
};

export default WithStore()(connect(MapStateToProps, MapDispatchToProps)(ModalForm));
