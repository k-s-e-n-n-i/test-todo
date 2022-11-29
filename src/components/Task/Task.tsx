import React, { useState } from 'react';
import { Props } from './interfaces';
import { Service } from '../../redux/services/ServiceRedux';
import ContentFormTask from '../ContentFormTask/ContentFormTask';
import ModalForm from '../ModalForm/ModalForm';
import './Task.scss';
import './Task-media.scss';
import { IFFile, IFProject, IFTime } from '../../redux/initState/InterfacesState';
import { connect } from 'react-redux';
import WithStore from '../../redux/hoc/WithStore';
import { MapStateToProps } from '../../redux/services/MapStateToProps';
import { MapDispatchToProps } from '../../redux/services/MapDispatchToProps';
import { PriorityTexts, Statutes, StatutesTexts } from '../../redux/services/Constants';
import moment from 'moment';
import TimeInWork from '../TimeInWork/TimeInWork';
import { Checkbox, FormControlLabel, Input } from '@mui/material';
import FileUpload from '../FileUpload/FileUpload';
import CommentsBlock from '../CommentsBlock/CommentsBlock';

const Task = ({ task, currentProject, projects, projectsLoaded, currentProjectUpdated }: Props) => {
  const { id, numberTask, title, date, description, status, time, dateEnd, priority, subTasks, files } = task;
  Service.definedCurrentProject({ projects, currentProjectUpdated });

  const [updatedProject, setUpdatedProject] = useState<IFProject>();
  const [addTime, setAddTime] = useState<IFTime>();
  const [addSubTask, setAddSubTask] = useState('');
  const [addFiles, setFiles] = useState<IFFile[] | null>(null);

  let sumMin: any = 0;
  time.forEach(({ timeStart, timeEnd }, i) => {
    sumMin += (new Date(timeEnd).getTime() - new Date(timeStart).getTime()) / 1000 / 60;
  });
  const hour = Math.floor(sumMin / 60);
  const minutes = Math.floor(sumMin - hour * 60);

  return (
    <div className={`task ${status === Statutes.Done ? 'task__done' : ''}`}>
      <h2>{`${numberTask}. ${title}`}</h2>
      <div className="task__main-block">
        <div>
          <p>{`Создано: ${date}`}</p>
          <p>{`Статус: ${status}`}</p>
          <p>{`Приоритет: ${priority}`}</p>
          <p>{`Дата окончания: ${moment(dateEnd).format('DD.MM.YYYY')}`}</p>
          <p>{`Время в работе: ${hour} ч. ${minutes} мин.`}</p>
        </div>

        <div className="task__column">
          <FormControlLabel
            className="task__checkbox-done"
            control={
              <Checkbox
                checked={status === Statutes.Done}
                onChange={(e) =>
                  Service.setStatusTask({
                    newStatus: status === Statutes.Done ? Statutes.Queue : Statutes.Done,
                    projects,
                    currentProject,
                    idTask: task.id,
                    projectsLoaded,
                  })
                }
              />
            }
            label={status === Statutes.Done ? 'Задача завершена' : 'Завершить задачу'}
          />

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

          <ModalForm
            textButton="Добавить подзадачу"
            saved={() => {
              Service.addedSubTask({
                nameSubTask: addSubTask,
                projects,
                currentProject,
                idTask: id,
                projectsLoaded,
              });
              setAddSubTask('');
            }}
            content={
              <div>
                <h2>Подзадача</h2>
                <Input
                  value={addSubTask}
                  placeholder="Наименование"
                  onChange={(e) => setAddSubTask(e.target.value)}
                />
              </div>
            }
          />

          <ModalForm
            textButton="Загрузить файлы"
            saved={() => {
              Service.uploadFiles({
                addFiles,
                projects,
                currentProject,
                idTask: id,
                projectsLoaded,
              });
              setFiles(null);
            }}
            content={<FileUpload setFiles={setFiles} />}
          />
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
        <div className="task__column">
          <h3>Подзадачи:</h3>
          {subTasks.map(({ name, done, id }, i) => (
            <FormControlLabel
              control={
                <Checkbox
                  checked={done}
                  onChange={(e) =>
                    Service.setStatusSubTask({
                      doneSubTask: e.target.checked,
                      idSubTask: id,
                      projects,
                      currentProject,
                      idTask: task.id,
                      projectsLoaded,
                    })
                  }
                />
              }
              label={name}
              key={i}
            />
          ))}
        </div>
        <div>
          <h3>Файлы:</h3>
          {files
            ? files.map((item, i) => (
                <div key={i}>
                  <a href={item.file} download={item.nameFile} target="_blank" rel="noreferrer">
                    {item.nameFile}
                  </a>
                </div>
              ))
            : null}
        </div>
      </div>

      <CommentsBlock idTask={id} />
    </div>
  );
};

export default WithStore()(connect(MapStateToProps, MapDispatchToProps)(Task));
