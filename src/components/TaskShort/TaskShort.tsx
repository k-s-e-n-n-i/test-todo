import React from 'react';
import { Props } from './interfaces';
import { Service } from '../../redux/services/ServiceRedux';
import './TaskShort.scss';
import { connect } from 'react-redux';
import WithStore from '../../redux/hoc/WithStore';
import { MapStateToProps } from '../../redux/services/MapStateToProps';
import { MapDispatchToProps } from '../../redux/services/MapDispatchToProps';
import moment from 'moment';

const TaskShort = ({ task, projects, currentProjectUpdated }: Props) => {
  const { numberTask, title, status, dateEnd, priority } = task;
  Service.definedCurrentProject({ projects, currentProjectUpdated });

  return (
    <div className={`task-short`}>
      <h2>{`${numberTask}. ${title}`}</h2>
      <p>{`Статус: ${status}`}</p>
      <p>{`Приоритет: ${priority}`}</p>
      <p>{`Дата окончания: ${dateEnd ? moment(dateEnd).format('DD.MM.YYYY') : 'не указана'}`}</p>
    </div>
  );
};

export default WithStore()(connect(MapStateToProps, MapDispatchToProps)(TaskShort));
