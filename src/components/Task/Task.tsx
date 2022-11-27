import React, { useState } from 'react';
import { Props } from './interfaces';
import { Service } from '../../redux/services/ServiceRedux';
import ContentFormTask from '../ContentFormTask/ContentFormTask';
import ModalForm from '../ModalForm/ModalForm';
import './Task.scss';
import { IFProject, IFTime } from '../../redux/initState/InterfacesState';
import { connect } from 'react-redux';
import WithStore from '../../redux/hoc/WithStore';
import { MapStateToProps } from '../../redux/services/MapStateToProps';
import { MapDispatchToProps } from '../../redux/services/MapDispatchToProps';
import { PriorityTexts, StatutesTexts } from '../../redux/services/Constants';
import moment from 'moment';
import TimeInWork from '../TimeInWork/TimeInWork';

const Task = ({ task, currentProject, projects, projectsLoaded, currentProjectUpdated }: Props) => {
  const { id, title, date, description, status, time, dateEnd, priority } = task;
  Service.definedCurrentProject({ projects, currentProjectUpdated });

  const [updatedProject, setUpdatedProject] = useState<IFProject>();
  const [addTime, setAddTime] = useState<IFTime>();

  let sumMin: any = 0;
  time.forEach(({ timeStart, timeEnd }, i) => {
    sumMin += (new Date(timeEnd).getTime() - new Date(timeStart).getTime()) / 1000 / 60;
  });
  const hour = Math.floor(sumMin / 60);
  const minutes = Math.floor(sumMin - hour * 60);

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
                  time,
                  priority: PriorityTexts.indexOf(priority),
                }}
              />
            }
          />

          <ModalForm
            textButton="Добавить время"
            saved={() =>
              Service.addedTimeInWork({ time: addTime, projects, currentProject, idTask: id, projectsLoaded })
            }
            content={
              <div>
                <h2>Время в работе:</h2>
                <TimeInWork setTime={setAddTime} />
              </div>
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

      <div className="task__main-block">
        <div>
          <h3>{`Время в работе:`}</h3>
          {time.map(({ date, timeStart, timeEnd }, i) => (
            <p key={i}>
              {`${moment(date).format('DD.MM.YY')} с ${moment(timeStart).format('hh:mm')} по ${moment(
                timeEnd
              ).format('HH:mm')}`}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WithStore()(connect(MapStateToProps, MapDispatchToProps)(Task));
