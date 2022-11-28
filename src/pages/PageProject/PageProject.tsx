import React, { useState, useEffect } from 'react';
import './PageProject.scss';
import { Props } from './interfaces';
import Task from '../../components/Task/Task';
import { connect } from 'react-redux';
import WithStore from '../../redux/hoc/WithStore';
import { MapStateToProps } from '../../redux/services/MapStateToProps';
import { MapDispatchToProps } from '../../redux/services/MapDispatchToProps';
import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs';
import ModalForm from '../../components/ModalForm/ModalForm';
import { IFProject, IFTask } from '../../redux/initState/InterfacesState';
import ContentFormTask from '../../components/ContentFormTask/ContentFormTask';
import { Service } from '../../redux/services/ServiceRedux';
import { Input } from '@mui/material';

const PageProject = ({ currentProject, projects, projectsLoaded, currentProjectUpdated }: Props) => {
  Service.definedCurrentProject({ projects, currentProjectUpdated });

  const [updatedProject, setUpdatedProject] = useState<IFProject>();
  const [search, setSearch] = useState('');
  const [filterTasks, setFilterTasks] = useState<IFTask[]>(currentProject?.tasks || []);

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

        <div className="page-project__tasks">
          {filterTasks.map((task, i) => (
            <Task task={task} key={i} />
          ))}
        </div>
      </div>
    );
  }

  return null;
};

export default WithStore()(connect(MapStateToProps, MapDispatchToProps)(PageProject));
