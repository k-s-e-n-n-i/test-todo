import React, { useState, useEffect, Fragment } from 'react';
import './PageProject.scss';
import { Props } from './interfaces';
import { connect } from 'react-redux';
import WithStore from '../../redux/hoc/WithStore';
import { MapStateToProps } from '../../redux/services/MapStateToProps';
import { MapDispatchToProps } from '../../redux/services/MapDispatchToProps';
import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs';
import ModalForm from '../../components/ModalForm/ModalForm';
import { IFProject, IFTask } from '../../redux/initState/InterfacesState';
import ContentFormTask from '../../components/ContentFormTask/ContentFormTask';
import { Service } from '../../redux/services/ServiceRedux';
import { Button, Input } from '@mui/material';
import Dnd from '../../components/Dnd/Dnd';
import { IFDndColumn } from '../../components/Dnd/interfaces';
import { Statutes, StatutesTexts } from '../../redux/services/Constants';
import Task from '../../components/Task/Task';

const PageProject = ({
  currentProject,
  projects,
  projectsLoaded,
  currentProjectUpdated,
  modal,
  modalUpdated,
}: Props) => {
  Service.definedCurrentProject({ projects, currentProjectUpdated });

  const [updatedProject, setUpdatedProject] = useState<IFProject>();
  const [search, setSearch] = useState('');
  const [filterTasks, setFilterTasks] = useState<IFTask[]>(currentProject?.tasks || []);
  const [listTask, setListTask] = useState<IFDndColumn[]>([]);

  useEffect(() => {
    if (currentProject) {
      setFilterTasks(currentProject?.tasks);
    }
  }, [currentProject]);

  useEffect(() => {
    if (currentProject) {
      const arrTasks = Service.searchTask({ search, tasks: currentProject.tasks });
      setFilterTasks(arrTasks);
    }
  }, [search]);

  useEffect(() => {
    setListTask([
      {
        title: Statutes.Queue,
        items: filterTasks.filter((x) => x.status === Statutes.Queue),
      },
      {
        title: Statutes.Development,
        items: filterTasks.filter((x) => x.status === Statutes.Development),
      },
      {
        title: Statutes.Done,
        items: filterTasks.filter((x) => x.status === Statutes.Done),
      },
    ]);
  }, [filterTasks]);

  useEffect(() => {
    listTask.forEach((column, i) => {
      const editStatusTask = column.items.find((x) => x.status !== StatutesTexts[i]);
      if (editStatusTask) {
        Service.setStatusTask({
          newStatus: StatutesTexts[i],
          projects,
          currentProject,
          idTask: editStatusTask.id,
          projectsLoaded,
        });
      }
    });
  }, [listTask]);

  if (currentProject) {
    return (
      <div className="page-project">
        <div className="page-project__line">
          <Breadcrumbs title={currentProject.name} />

          <ModalForm
            textButton="Добавить задачу"
            saved={() => Service.savedTask({ projects, projectsLoaded, currentProject, updatedProject })}
            content={<ContentFormTask project={currentProject} setUpdatedProject={setUpdatedProject} />}
          />

          <Input value={search} placeholder="Поиск" onChange={(e) => setSearch(e.target.value)} />
        </div>

        {listTask.length !== 0 ? (
          <Dnd columns={listTask} setColumns={(data: IFDndColumn[]) => setListTask(data)} />
        ) : null}

        {modal !== '' && modal !== undefined ? (
          <Fragment>
            <div className="modal-form-bg" onClick={() => modalUpdated('')}></div>
            <form className="modal-form">
              <div className="modal-form__content">
                <Task task={filterTasks.find((x) => x.id === modal)} />

                <div className="modal-form__buttons">
                  <Button onClick={() => modalUpdated('')}>Отменить</Button>
                  <Button type="submit" onClick={() => modalUpdated('')}>
                    Сохранить
                  </Button>
                </div>
              </div>
            </form>
          </Fragment>
        ) : null}
      </div>
    );
  }

  return null;
};

export default WithStore()(connect(MapStateToProps, MapDispatchToProps)(PageProject));
