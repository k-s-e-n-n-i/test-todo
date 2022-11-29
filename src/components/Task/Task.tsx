import React, { useState, Fragment } from 'react';
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
import { Button, Checkbox, FormControlLabel, Input } from '@mui/material';
import FileUpload from '../FileUpload/FileUpload';
import CommentsBlock from '../CommentsBlock/CommentsBlock';
import EditForm from '../EditForm/EditForm';

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
          <EditForm
            buttonText="Редактировать"
            saved={() => Service.savedTask({ projects, projectsLoaded, currentProject, updatedProject })}
            contentMain={
              <Fragment>
                <p>{`Создано: ${date}`}</p>
                <p>{`Статус: ${status}`}</p>
                <p>{`Приоритет: ${priority}`}</p>
                <p>{`Дата окончания: ${dateEnd ? moment(dateEnd).format('DD.MM.YYYY') : 'не указана'}`}</p>
              </Fragment>
            }
            contentEdit={
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
        </div>

        <span></span>

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
        </div>
      </div>

      <p>
        <span>Описание: </span>
        {description}
      </p>

      <div className="task__main-block">
        <div>
          <h3>{`Время в работе: ${hour} ч. ${minutes} мин.`}</h3>
          {time.map(({ date, timeStart, timeEnd }, i) => (
            <p key={i}>
              {`${moment(date).format('DD.MM.YY')} с ${moment(timeStart).format('HH:mm')} по ${moment(
                timeEnd
              ).format('HH:mm')}`}
            </p>
          ))}
          <EditForm
            buttonText="Добавить"
            contentMain={null}
            contentEdit={<TimeInWork setTime={setAddTime} />}
            saved={() =>
              Service.addedTimeInWork({
                time: addTime,
                projects,
                currentProject,
                idTask: id,
                projectsLoaded,
              })
            }
          />
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
          <EditForm
            buttonText="Добавить"
            contentMain={null}
            contentEdit={
              <Input
                value={addSubTask}
                placeholder="Наименование"
                onChange={(e) => setAddSubTask(e.target.value)}
              />
            }
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
          />
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
          <EditForm
            buttonText="Загрузить"
            contentMain={null}
            contentEdit={<FileUpload setFiles={setFiles} />}
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
          />
        </div>
      </div>

      <CommentsBlock idTask={id} />
    </div>
  );
};

export default WithStore()(connect(MapStateToProps, MapDispatchToProps)(Task));
