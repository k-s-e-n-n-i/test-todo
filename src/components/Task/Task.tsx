import React, { useState } from 'react';
import { Props } from './interfaces';
import { Service } from '../../redux/services/ServiceRedux';
import ContentFormTask from '../ContentFormTask/ContentFormTask';
import ModalForm from '../ModalForm/ModalForm';
import './Task.scss';
import { IFProject } from '../../redux/initState/InterfacesState';
import { connect } from 'react-redux';
import WithStore from '../../redux/hoc/WithStore';
import { MapStateToProps } from '../../redux/services/MapStateToProps';
import { MapDispatchToProps } from '../../redux/services/MapDispatchToProps';
import { PriorityTexts, StatutesTexts } from '../../redux/services/Constants';
import moment from 'moment';

const Task = ({ task, currentProject, projects, projectsLoaded, currentProjectUpdated }: Props) => {
  const {
    id,
    title,
    date,
    description,
    status,
    time: { hour, minutes },
    dateEnd,
    priority,
  } = task;
  Service.definedCurrentProject({ projects, currentProjectUpdated });

  const [updatedProject, setUpdatedProject] = useState<IFProject>();

  return (
    <div className="task">
      <h2>{`${id}. ${title}`}</h2>
      <div className="task__main-block">
        <div>
          <p>{`Создано: ${date}`}</p>
          <p>{`Статус: ${status}`}</p>
          <p>{`Приоритет: ${priority}`}</p>
          <p>{`Дата окончания: ${moment(dateEnd).format('DD.MM.YYYY')}`}</p>
          <p>{`Время в работе: ${hour} ч. ${minutes} мин.`}</p>
        </div>

        <div>
          <ModalForm
            textButton="Редактировать задачу"
            saved={() => Service.savedTask({ projects, projectsLoaded, currentProject, updatedProject })}
            content={
              <ContentFormTask
                project={currentProject}
                setUpdatedProject={setUpdatedProject}
                editData={{
                  id,
                  title,
                  description,
                  dateEnd,
                  status: StatutesTexts.indexOf(status),
                  time: { hour, minutes },
                  priority: PriorityTexts.indexOf(priority),
                }}
              />
            }
          />

          <p>files</p>
          <button>Добавить подзадачу</button>
          <div>Комментарии....</div>
        </div>
      </div>

      <p>
        <span>Описание: </span>
        {description}
      </p>
    </div>
  );
};

export default WithStore()(connect(MapStateToProps, MapDispatchToProps)(Task));
