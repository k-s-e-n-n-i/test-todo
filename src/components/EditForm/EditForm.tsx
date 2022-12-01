import React from 'react';
import { Props } from './interfaces';
import { Button } from '@mui/material';
import './EditForm.scss';
import WithStore from '../../redux/hoc/WithStore';
import { connect } from 'react-redux';
import { MapStateToProps } from '../../redux/services/MapStateToProps';
import { MapDispatchToProps } from '../../redux/services/MapDispatchToProps';

const EditForm = ({
  contentEdit,
  contentMain,
  deleted,
  saved,
  canceled,
  id,
  idEditField,
  idEditFieldUpdated,
}: Props) => {
  return (
    <div className="edit-form">
      <div className="edit-form__content">
        {id === idEditField ? (
          <form>
            {contentEdit}
            <div className="edit-form__buttons">
              <Button
                onClick={() => {
                  idEditFieldUpdated(0);
                  canceled();
                }}
              >
                Отменить
              </Button>
              <Button
                type="submit"
                onClick={() => {
                  idEditFieldUpdated(0);
                  saved();
                }}
              >
                Сохранить
              </Button>
            </div>
          </form>
        ) : (
          <div className="edit-form__line">
            <div>{contentMain}</div>
            <img
              src={require('./img/edit.png')}
              alt="редактировать"
              className="edit-form__icon"
              onClick={() => idEditFieldUpdated(id)}
            ></img>
            {deleted ? (
              <img
                src={require('./img/delete.png')}
                alt="удалить"
                className="edit-form__icon"
                onClick={deleted}
              ></img>
            ) : null}
          </div>
        )}
      </div>
    </div>
  );
};

export default WithStore()(connect(MapStateToProps, MapDispatchToProps)(EditForm));
