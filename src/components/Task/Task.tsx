import React, { useState, Fragment } from 'react';
import { Props } from './interfaces';
import { Service } from '../../redux/services/ServiceRedux';
import ContentFormTask from '../ContentFormTask/ContentFormTask';
import './Task.scss';
import './Task-media.scss';
import { IFProject } from '../../redux/initState/InterfacesState';
import { connect } from 'react-redux';
import WithStore from '../../redux/hoc/WithStore';
import { MapStateToProps } from '../../redux/services/MapStateToProps';
import { MapDispatchToProps } from '../../redux/services/MapDispatchToProps';
import { PriorityTexts, Statutes, StatutesTexts } from '../../redux/services/Constants';
import moment from 'moment';
import CommentsBlock from '../CommentsBlock/CommentsBlock';
import EditForm from '../EditForm/EditForm';
import SubTasks from '../SubTasks/SubTasks';
import TaskTime from '../TaskTime/TaskTime';
import TaskFiles from '../TaskFiles/TaskFiles';
import Checkbox from '../Checkbox/Checkbox';

const Task = ({ task, currentProject, projects, projectsLoaded, currentProjectUpdated }: Props) => {
  const { id, numberTask, title, date, description, status, time, dateEnd, priority } = task;
  Service.definedCurrentProject({ projects, currentProjectUpdated });

  const [updatedProject, setUpdatedProject] = useState<IFProject>();

  return (
    <div className={`task ${status === Statutes.Done ? 'task__done' : ''}`}>
      <h2>{`${numberTask}. ${title}`}</h2>
      <div>
        <EditForm
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

        <div className="task__closed-task">
          <Checkbox
            label={status === Statutes.Done ? 'Задача завершена' : 'Завершить задачу'}
            checked={status === Statutes.Done}
            onChange={() =>
              Service.setStatusTask({
                newStatus: status === Statutes.Done ? Statutes.Queue : Statutes.Done,
                projects,
                currentProject,
                idTask: task.id,
                projectsLoaded,
              })
            }
          />
        </div>
      </div>

      <h3>Описание: </h3>
      <p dangerouslySetInnerHTML={{ __html: description }}></p>

      <div className="task__info">
        <TaskTime task={task} />

        <SubTasks task={task} />

        <TaskFiles task={task} />
      </div>

      <CommentsBlock idTask={id} />
    </div>
  );
};

export default WithStore()(connect(MapStateToProps, MapDispatchToProps)(Task));
