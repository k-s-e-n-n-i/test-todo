import React from 'react';
import { Props } from './interfaces';
import { Service } from '../../redux/services/ServiceRedux';
import './TaskShort.scss';
import { connect } from 'react-redux';
import WithStore from '../../redux/hoc/WithStore';
import { MapStateToProps } from '../../redux/services/MapStateToProps';
import { MapDispatchToProps } from '../../redux/services/MapDispatchToProps';
import moment from 'moment';
import ModalForm from '../ModalForm/ModalForm';
import Task from '../Task/Task';

const TaskShort = ({ task, projects, currentProjectUpdated }: Props) => {
  const { numberTask, title, dateEnd, priority } = task;
  Service.definedCurrentProject({ projects, currentProjectUpdated });

  return (
    <div className={`task-short`}>
      <h2>{`${numberTask}. ${title}`}</h2>
      <p className="task-short__text">{`Приоритет: ${priority}`}</p>
      <p className="task-short__text">
        {`Дата окончания: `}
        <span>{dateEnd ? moment(dateEnd).format('DD.MM.YYYY') : 'не указана'}</span>
      </p>

      <ModalForm textButton="Просмотр" saved={() => {}} content={<Task task={task} />} id={task.id} />
    </div>
  );
};

export default WithStore()(connect(MapStateToProps, MapDispatchToProps)(TaskShort));
