import React from 'react';
import { Props } from './interfaces';
import { Service } from '../../redux/services/ServiceRedux';
import './TaskShort.scss';
import { connect } from 'react-redux';
import WithStore from '../../redux/hoc/WithStore';
import { MapStateToProps } from '../../redux/services/MapStateToProps';
import { MapDispatchToProps } from '../../redux/services/MapDispatchToProps';
import moment from 'moment';

const TaskShort = ({ task, modalUpdated }: Props) => {
  const { numberTask, title, dateEnd, priority } = task;

  return (
    <div className={`task-short`}>
      <h2>{`${numberTask}. ${title}`}</h2>
      <p className="task-short__text">{`Приоритет: ${priority}`}</p>
      <p className="task-short__text">
        {`Дата окончания: `}
        <span>{dateEnd ? moment(dateEnd).format('DD.MM.YYYY') : 'не указана'}</span>
      </p>

      <button
        className="my-button"
        type="button"
        onClick={() => {
          modalUpdated(task.id);
          Service.bodyHidden();
        }}
      >
        Просмотр
      </button>
    </div>
  );
};

export default WithStore()(connect(MapStateToProps, MapDispatchToProps)(TaskShort));
