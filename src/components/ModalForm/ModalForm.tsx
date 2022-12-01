import React, { Fragment } from 'react';
import { Props } from './interfaces';
import './ModalForm.scss';
import WithStore from '../../redux/hoc/WithStore';
import { connect } from 'react-redux';
import { MapStateToProps } from '../../redux/services/MapStateToProps';
import { MapDispatchToProps } from '../../redux/services/MapDispatchToProps';
import { Service } from '../../redux/services/ServiceRedux';

const ModalForm = ({ textButton, content, saved, modal, modalUpdated, id }: Props) => {
  return (
    <Fragment>
      <button
        className="my-button"
        onClick={() => {
          modalUpdated(id);
          Service.bodyHidden();
        }}
      >
        {textButton}
      </button>

      {modal === id ? (
        <Fragment>
          <div
            className="modal-form-bg"
            onClick={() => {
              modalUpdated('');
              Service.bodyAuto();
            }}
          ></div>
          <form className="modal-form">
            <div className="modal-form__content">
              {content}

              <div className="modal-form__buttons">
                <button
                  className="my-button"
                  onClick={() => {
                    modalUpdated('');
                    Service.bodyAuto();
                  }}
                >
                  Отменить
                </button>
                <button
                  className="my-button"
                  type="submit"
                  onClick={() => {
                    modalUpdated('');
                    Service.bodyAuto();
                    saved();
                  }}
                >
                  Сохранить
                </button>
              </div>
            </div>
          </form>
        </Fragment>
      ) : null}
    </Fragment>
  );
};

export default WithStore()(connect(MapStateToProps, MapDispatchToProps)(ModalForm));
